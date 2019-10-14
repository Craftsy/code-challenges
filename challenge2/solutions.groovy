@Grab( 'com.fasterxml.jackson.core:jackson-databind:2.9.9' )
import com.fasterxml.jackson.databind.ObjectMapper
import com.fasterxml.jackson.databind.JsonNode


def defaultMessage = """
{
    "user": "Tom",
    "timestamp": "8:49am",
    "message": "_Hi_, this ~text~ example uses all of the *custom* formatting we `care` about." 
}
"""

def theFunction = {String json, List<List<String>> moreFormatters = [] ->
    def om = new ObjectMapper()
    def node = om.readValue( json, JsonNode )
    def rawMessage = node.get( "message" ).asText()
    def defaultFormatters = [
            ["*", "strong"],
            ["_", "i"], //should actually be em
            ["~", "strike"],
            ["`", "pre"],
            ["```", "pre"]
    ]
    def formattedMessage = rawMessage
    defaultFormatters.each {f ->
        formattedMessage = formattedMessage.replaceAll( /\${f[0]}([^${f[0]}]+)\${f[0]}/, "<${f[1]}>\$1</${f[1]}>" )
    }
    moreFormatters.each {f ->
        if ( f != null && f.size() >= 2 )
        {
            formattedMessage = formattedMessage.replaceAll( /\${f[0]}([^${f[0]}]+)\${f[0]}/, "<${f[1]}>\$1</${f[1]}>" )
        }
    }
    def renderField = {String field ->
        if ( node.get( field ) != null && node.get( field ).isTextual() )
        {
            return "<${field}>${node.get( field ).asText()}</${field}>"
        }
        else
        {
            return ""
        }
    }
    def nonMessageFields = node.fieldNames().findAll {it != "message"}
    def renderedFields = nonMessageFields.collect {renderField.call( it )}.join( "\n        " )
    return """
    <message>
        ${renderedFields}
        <text>${formattedMessage}</text>
    </message>
    """
}

println( theFunction.call( defaultMessage ) )

println("*********************************")
println("extra version!!!")
println("*********************************")
def cool = """
{
    "user": "Tom",
    "timestamp": "8:49am",
    "timezone": "MDT",
    "message": "_Hi_, ~guess what:~ ^horsey^ is a word and %zang% is *not*." 
}
"""
println( theFunction.call( cool, [["^", "chuck"],["%", "bones"]] ) )
