import UIKit

let payload = "{ \"user\": \"Steve Jobs\", \"timestamp\": \"9:41am\", \"message\": \"This is a simple message. Here is the *bold.* And now _italic._ What about a ~strike~ for you? \\n\\nNow we have `pre style` with a ```bigger pre``` text.\\n\\nThe End.\" }"
let data = payload.data(using: .utf8)

struct SlackMessage: Codable {
    let user: String
    let timestamp: String
    let message: String
}

struct Formatter {
    let slack: String
    let html: String
    let isSingleTag: Bool
}

enum Formatters: CaseIterable {
    case strong, italic, strike, formattedLarge, formattedSingle, linebreak
}

let message = try JSONDecoder().decode(SlackMessage.self, from: data!)

func convertToHTML(_ slack: SlackMessage) -> String {
    var htmlMessage = "<message>"
    htmlMessage += "\n<user>\(slack.user)</user>"
    htmlMessage += "\n<time>\(slack.timestamp)</time>"
    htmlMessage += "\n<message>\(parseFormatters(slack.message))</message>"
    htmlMessage += "\n</message>"
    return htmlMessage
}

func createFormatters() -> [Formatter] {
    var formatters = [Formatter]()
    for formatter in Formatters.allCases {
        switch formatter {
        case .strong:
            formatters.append(Formatter(slack: "*", html: "<strong>", isSingleTag: false))
        case .italic:
            formatters.append(Formatter(slack: "_", html: "<i>", isSingleTag: false))
        case .strike:
            formatters.append(Formatter(slack: "~", html: "<strike>", isSingleTag: false))
        case .formattedLarge:
            formatters.append(Formatter(slack: "```", html: "<pre>", isSingleTag: false))
        case .formattedSingle:
            formatters.append(Formatter(slack: "`", html: "<pre>", isSingleTag: false))
        case .linebreak:
            formatters.append(Formatter(slack: "\n", html: "<br />", isSingleTag: true))
        }
    }
    return formatters
}

func parseFormatters(_ message: String) -> String {
    var newMessage = message
    for formatter in createFormatters() {
        let numberOfOccurrences = message.components(separatedBy: formatter.slack).count - 1
        for i in 0..<numberOfOccurrences {
            var replaceString = String()
            if i == 0 || i % 2 == 0 || formatter.isSingleTag {
                replaceString = formatter.html
            } else {
                replaceString = formatter.html.replacingOccurrences(of: "<", with: "</")
            }
            if let range = newMessage.range(of: formatter.slack) {
                newMessage = newMessage.replacingCharacters(in: range, with: replaceString)
            }
        }
    }
    return newMessage
}

print(convertToHTML(message))
