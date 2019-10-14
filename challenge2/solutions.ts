type TagContent = string | Tag;

class Tag {
    private readonly tagName: string;
    private contents: TagContent[] = [];

    private constructor(tagName: string) {
        this.tagName = tagName;
        this.contents.push(`<${tagName}>`);
    }

    public static create(tagName: string): Tag {
        return new Tag(tagName);
    }

    public add(content: TagContent): Tag {
        this.contents.push(content);
        return this;
    }

    public close(): Tag {
        this.contents.push(`</${this.tagName}>`);
        return this;
    }

    public toString(): string {
        return this.contents.reduce((x,y) => x + y.toString()).toString();
    }
}

class Formatter {
    private readonly marker: string;
    private readonly tagName: string;

    constructor(marker: string, tagName: string) {
        this.marker = marker;
        this.tagName = tagName;
    }

    public format(text: string): string {
        let formatted = '';

        do {
            let start = 0, end = 0

            start = text.indexOf(this.marker)
            end = text.indexOf(this.marker, start+this.marker.length)

            if (start === -1 || end === -1) {
                formatted += text;
                break;
            }
            // get anything ahead of the next marker
            formatted += text.substring(0, start);
            // get anything in between the next set of markers
            formatted += Tag.create(this.tagName)
                            .add(text.substring(start+this.marker.length, end))
                            .close()
                            .toString();
            // trim text down to anything after the next marker
            text = text.substring(end+this.marker.length);
        } while (text)

        return formatted;
    }
}

class FormatManager {
    private formatters: Formatter[];

    constructor(formatters?: Formatter[]) {
        this.formatters = formatters || [];
    }

    public format(text: string) {
        let str = text;
        for(let formatter of this.formatters) {
            str = formatter.format(str);
        }
        return str
    }
}

export interface SlackMessage {
    user: string,
    timestamp: string,
    message: string
}

class App {
    private formatMgr: FormatManager

    constructor() {
        this.formatMgr = new FormatManager([
            new Formatter("```", "pre"),
            new Formatter("`", "pre"),
            new Formatter("*", "strong"),
            new Formatter("_", "i"),
            new Formatter("~", "strike")
        ]);
    }

    public run(message: SlackMessage): string {
        return Tag.create('message')
                .add(Tag.create('user')
                        .add(message.user)
                        .close())
                .add(Tag.create('time')
                        .add(message.timestamp)
                        .close())
                .add(Tag.create('text')
                        .add(this.formatMgr.format(message.message))
                        .close())
                .close()
                .toString();
    }
}

const app = new App();

console.log(app.run({
    user: 'Tom',
    timestamp: '8:49am',
    message: '_Hi, this_ _~text~ example uses all of the *custom* formatting we `care` *about*_.'
}));
