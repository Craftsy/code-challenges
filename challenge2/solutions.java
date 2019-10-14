import java.io.ByteArrayInputStream;
import java.io.StringWriter;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.Stream;
import javax.script.Invocable;
import javax.script.ScriptEngine;
import javax.script.ScriptEngineManager;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.stream.XMLOutputFactory;
import javax.xml.stream.XMLStreamException;
import javax.xml.stream.XMLStreamWriter;
import javax.xml.transform.OutputKeys;
import javax.xml.transform.Transformer;
import javax.xml.transform.TransformerFactory;
import javax.xml.transform.dom.DOMSource;
import javax.xml.transform.stream.StreamResult;
import org.w3c.dom.Document;
import org.xml.sax.InputSource;

public class Main {

    private static String definitelyNotJs = "" +
            "var necromancy = function(possiblyJson) {\n" +
            "  return JSON.parse(possiblyJson);\n" +
            "};";

    public static void main(String[] args) throws Exception {
        String json = "{\"user\": \"Tom\", \"timestamp\": \"8:49am\", \"message\": \"_Hi_, this ~text~ example uses all of the *custom* formatting we `care` about.\"}";
        System.out.println(json);
        ScriptEngine engine = new ScriptEngineManager().getEngineByName("nashorn");
        engine.eval(definitelyNotJs);

        Invocable darkMagic = (Invocable) engine;

        Map<String, Object> result = (Map<String, Object>) darkMagic.invokeFunction("necromancy", json);

        if (result.containsKey("message")) {
            String message = (String) result.get("message");
            message = Stream.of(message)
                    .map(s -> replaceIfMatching(s, "*", "strong"))
                    .map(s -> replaceIfMatching(s, '_', "i" ))
                    .map(s -> replaceIfMatching(s, '~', "strike"))
                    .map(s -> replaceIfMatching(s,  "```", "pre"))
                    .map(s -> replaceIfMatching(s, '`', "pre" ))
                    .collect(Collectors.joining());
            result.put("message", message);
        }

        StringWriter sw = new StringWriter();
        XMLOutputFactory factory = XMLOutputFactory.newFactory();
        factory.setProperty("escapeCharacters", false);
        XMLStreamWriter xml = factory.createXMLStreamWriter(sw);
        xml.writeStartElement("message");
        writeElement(xml, "user", result.get("user").toString());
        writeElement(xml, "time", result.get("timestamp").toString());
        writeElement(xml, "text", result.get("message").toString());
        xml.writeEndElement();
        xml.flush();

        Document doc = DocumentBuilderFactory.newInstance()
                .newDocumentBuilder()
                .parse(new InputSource(new ByteArrayInputStream(sw.toString().getBytes())));
        doc.normalizeDocument();
        TransformerFactory transformerFactory = TransformerFactory.newInstance();
        transformerFactory.setAttribute("indent-number", 2);
        Transformer transformer = transformerFactory.newTransformer();
        transformer.setOutputProperty(OutputKeys.ENCODING, "UTF-8");
        transformer.setOutputProperty(OutputKeys.OMIT_XML_DECLARATION, "yes");
        transformer.setOutputProperty(OutputKeys.INDENT, "yes");
        StringWriter stringWriter = new StringWriter();
        transformer.transform(new DOMSource(doc), new StreamResult(stringWriter));

        System.out.println(stringWriter.toString());
    }

    private static String replaceIfMatching(String s, char c, String tag) {
        return replaceIfMatching(s, String.valueOf(c), tag, getCount(s, c));
    }

    private static String replaceIfMatching(String s, String c, String tag) {
        return replaceIfMatching(s, c, tag, getCount(s, c));
    }

    private static String replaceIfMatching(String s, String replace, String tag, long count) {
        if (count == 1) {
            return s;
        }
        if (replace.equals("*")) {
            replace = "\\*";
        }
        boolean containsUnclosed = count % 2 == 1;
        String open = "<" + tag + ">";
        String close = "</" + tag + ">";
        while (count > 0) {
            // don't match the last unmatched one
            if (containsUnclosed && count == 1) {
                break;
            }
            if (count % 2 == 0) {
                s = s.replaceFirst(replace, open);
            } else {
                s = s.replaceFirst(replace, close);
            }
            count--;
        }
        return s;
    }

    private static long getCount(String s, char c) {
        return s.chars().filter(ch -> ch == c).count();
    }

    private static long getCount(String s, String x) {
        int lastIndex = 0;
        int count = 0;

        while (lastIndex != -1) {
            lastIndex = s.indexOf(x, lastIndex);
            if (lastIndex != -1) {
                count++;
                lastIndex += x.length();
            }
        }
        return count;
    }

    private static void writeElement(XMLStreamWriter xml,
                                     String elementName,
                                     String value) throws XMLStreamException {
        xml.writeStartElement(elementName);
        xml.writeCharacters(value);
        xml.writeEndElement();
    }
}
