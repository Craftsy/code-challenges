package main

import (
	"encoding/json"
	"fmt"
	"strings"
)

type SlackMessage struct {
  User string 
  Timestamp string
  Message string
}

func symbolSwap(baseString string, symbolToReplace string, openTag string, closeTag string, numSymbol int) string {
	if (numSymbol >= 2) {
		baseString = strings.Replace(baseString, symbolToReplace, openTag, 1)
		baseString = strings.Replace(baseString, symbolToReplace, closeTag, 1)
		numSymbol -= 2
	}
	return baseString
}

func (slackMessage SlackMessage) String() string {
	message := slackMessage.Message
	if (strings.ContainsAny(message, "*_~`")) {
		// message probably needs to be HTML formatted
		numStar := strings.Count(message, "*")
		numUnderline := strings.Count(message, "_")
		numTilde := strings.Count(message, "~")
		numBacktick := strings.Count(message, "`")

		message = symbolSwap(message, "*", "<b>", "</b>", numStar)
		message = symbolSwap(message, "_", "<i>", "</i>", numUnderline)
		message = symbolSwap(message, "~", "<strike>", "</strike>", numTilde)
		message = symbolSwap(message, "`", "<pre>", "</pre>", numBacktick)
	}

	return fmt.Sprintf(
`<message>
	<user>%s</user>
	<time>%s</time>
	<text>%s</text>
</message>`, slackMessage.User, slackMessage.Timestamp, message)
}

func main() {
	
	messageJson := 
	// Your JSON here plz
	`{
		"user": "TOM", 
		"timestamp": "12:30pm", 
		"message": "Well now, _you_ can just *go right ahead* and ~fuck off~ leave me alone plz*"
	}`
	var message SlackMessage
	json.Unmarshal([]byte(messageJson), &message)
	fmt.Println(message)
}