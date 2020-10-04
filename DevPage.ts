const content: WikiContent[] = [
            dedent`
            === Purpose ===
            TO show off who is using LWIS`,
            h3("Purpose"),
            "TO show off who is using LWIS",

            uml(["(*) -> (*)", 
                ...this.printUmlSubscriptions(subscriptions)
            ]),

        ];
