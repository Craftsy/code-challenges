# HTML view of Slack Messages

Build a function that takes a string of JSON data that will be a message object and reformat it into HTML.

We have built semantic html tags to correspond to the message object which will handle all styling. Each message needs to be in a `<message>` tag. Within that - the user data with be wrapped with a `<user>` tag, the timestamp will be in a `<time>` tag, and the text of the message will be in a `<text>` tag.

Assume that all timestamps are in UTC and will displayed in UTC in the given format (e.g. we do not need to handle timezones or date formatting).

For example:

Message object:
```
{
    user: string,
    timestamp: string,
    message: string
}
```
HTML Output:
```
<message>
    <user></user>
    <time></time>
    <text></text>
</message>
```
 
Next, we would like to handle custom slack formatting. Slack has a number of custom ways to handle formatting.

`*` for bold, `_` for italic, `~` for strike-through, and ` for code and ``` for preformatted blocks.

If possible, these should be translated to a pre-defined set of HTML tags as well.

`*` -> `<strong>`</br>
`_` -> `<i>`</br>
`~` -> `<strike>`</br>
` or ``` -> pre tag (which I can't write because it breaks markdown)</br>

Keep in mind that unclosed symbols should not be translated.

Example Message

Message object:
```
{
    user: 'Tom',
    timestamp: '8:49am',
    message: '_Hi_, this ~text~ example uses all of the *custom* formatting we `care` about.' 
}
```
HTML Output:
```
<message>
    <user>Tom</user>
    <time>8:49am</time>
    <text><i>Hi</i>, this <strike>text</strike> example uses all of the <b>custom</b> formatting we ,<pre>care</pre> about.</text>
</message>
```

Bonus: Build a solution that is extensible for more formatting or additional fields.

Timebox: 2 hours</br>
Mainstream languages only</br>
Answers due by Monday (10/07/2019)</br>

Submit responses to: https://docs.google.com/forms/d/e/1FAIpQLSdkY2KtZFp7VFlf5XVKdHrU70KjgycyipIPpxFC_W-AnwtsDQ/viewform