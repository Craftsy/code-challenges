// Solution 1
const message = {
    user: 'Tom',
    timestamp: '8:49am',
    message: '😎 _Hi, *~_this_~* ~text~ example uses all of the *custom* formatting we `care` about.', 
    futureField: 'The Future',
    naughtyFutureField: null
}

function htmlify(obj, targetElementID) {
  let openingTag = '';
  let closingTag = '';
  let formattedMessage = null;
  let elementArray = [];
  const targetElement = document.getElementById(targetElementID);
 
  for (let [key, value] of Object.entries(obj)) {
    createTags(key);
    formatMessage(value);
    //check if we actually have a formatted message, if not later gator
    if (formattedMessage) {
      let element = `${openingTag}${formattedMessage}${closingTag}`;
      elementArray.push(element);
      formattedMessage = null;
    }
  }
  
  if (targetElement) {
    const messageElement = document.createElement('message');
    messageElement.setAttribute('id', '🤘');
    targetElement.appendChild(messageElement);
    const selMessageElement = document.getElementById('🤘');
    selMessageElement.innerHTML = elementArray.join('');
  }
   
  function createTags(key) {
    switch(key) {
      case 'user':
        openingTag ='<user>';
        closingTag ='</user>';
        break;
      case 'timestamp':
        openingTag ='<time>';
        closingTag ='</time>';
        break;
      case 'message':
        openingTag ='<text>';
        closingTag ='</text>';
        break;
      default:
        //default to span to gaurd against future "unknown" fields
        openingTag ='<span>';
        closingTag ='</span>';
        break;
    }
  }

  function formatMessage(value) {
    const formattingObj = {
      'strong': '*',
      'i': '_',
      'strike': '~',
      'pre': '`',
    };
    if (value) {
      let valueArray = value.split(' ');    
      let formattedValueArray = valueArray.map(function(value){
        Object.keys(formattingObj).forEach(function(key) {
          let count = value.split(formattingObj[key]).length - 1        
          if (value.includes(formattingObj[key]) && count === 2) {
            value = value.replace(formattingObj[key], '<' + key + '>');
            value = value.replace(formattingObj[key], '</' + key + '>');
          }
        });
        return value;
      });
      formattedMessage = formattedValueArray.join(' ');
    }
  }
  
}

htmlify(message, '🤯'); 

// Solution 2
const c = (f, ...fns) => (...a) => fns.reduce((s, fn) => fn(s), f(...a));
const p = (fn, i) => v => fn.call(v, i);

const SlackCharacters = [
    {char: '_', tag: 'i'},
    {char: '*', tag: 'strong'},
    {char: '~', tag: 'strike'},
    {char: '`', tag: 'pre'}
];

const slackParser = c(
    p([].map,r => (e => ({m: e, r: s => s.replace(e, `<${r.tag}>${e.exec(s).groups.t}</${r.tag}>`)}))((m => new RegExp(`${m}(?<t>(\\w|\\s|\\d)*)${m}`))(r.char.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')))),
    rs => c(s => [s, c(x => [rs.find(r => r.m.test(x)), x],([r, x]) => r && r.m.test(x) && r.r(x))],([s,f]) => {let x, y = s;while(x = f(y)){y = x}return y})
)(SlackCharacters);

const challenge = obj => (`
<message>
    <user>${obj.user}</user>
    <time>${obj.timestamp}></time>
    <text>${slackParser(obj.message)}</text>
</message>
`).trim();

// Solution 3
const message = {
    user: 'Man with Hat',
    timestamp: '01:20pm',
    message: '*TIL* in Switzerland it is `illegal` to own _just one_ ~pot belly~ Guinea pig.'
}

// DESIRED OUT PUT:
// <message>
//     <user></user>
//     <time></time>
//     <text></text>
// </message>
// ​
let messageArr = Object.keys(message);
let contentArr = Object.values(message);


document.getElementById('runButton').onclick = function postMessage() {
    let messElement = document.createElement('message');
    messageArr.forEach(function(key, i){
      document.body.appendChild(messElement)
      switch (messageArr[i]) {

      case 'user' :
        let userElement = document.createElement(messageArr[i]);
        messElement.appendChild(userElement);
        userElement.innerHTML=contentArr[i];
        break;

      case 'timestamp' :
        let timeElement = document.createElement('time');
        messElement.appendChild(timeElement);
        timeElement.innerHTML=contentArr[i];
        break;

      case 'message' :
        let textElement = document.createElement('text');
        messElement.appendChild(textElement);
      
        let regexBold = /\*(.*?)\*/g;
        let regexItalic = /\_(.*?)\_/g;
        let regexStrike = /\~(.*?)\~/g;
        let regexPre = /\`(.*?)\`/g;
        
        let stringToBold = contentArr[i].match(regexBold);
        let stringToItalics = contentArr[i].match(regexItalic);
        let stringToStrike = contentArr[i].match(regexStrike);
        let stringToPre = contentArr[i].match(regexPre);
        textElement.innerHTML = contentArr[i].replace(regexBold, ' <b>' + stringToBold + '</b> ').replace(regexItalic, ' <i>' + stringToItalics + '</i> ').replace(regexStrike, ' <s>' + stringToStrike + '</s> ').replace(regexPre, ' <pre>' + stringToPre + '</pre> ').replace(/[\*_~`]/g, '');
        break;

    }
  })
}
