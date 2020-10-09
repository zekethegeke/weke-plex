export class WekeUmlBuilder {
    private content: string;

    constructor(readonly builder: WekeBuilder) {
        this.content = '{{plantUML}}\n@startuml\n';
    }
    append(text: string): WekeUmlBuilder {
        this.content += text;
        return this;
    }
    endUml(): WekeBuilder {
        this.content += '\n@enduml\n{{/plantUML}}\n';
        this.builder.append(this.content);
        return this.builder;
    }
}

export class WekeBuilder {
    private content: string;
    constructor() {
        this.content = '';
    }

    h3(title: string): WekeBuilder {
        this.content += `=== ${title} ===\n`;
        return this;
    }
    append(text: string): WekeBuilder {
        this.content += text;
        return this;
    }
    startUml(): WekeUmlBuilder {
        return new WekeUmlBuilder(this);
    }
    build(): string {
        return this.content;
    }
}
