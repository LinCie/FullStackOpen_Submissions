# New Note in Single Page App Diagram

```mermaid
sequenceDiagram;
    participant browser;
    participant server;

    Note right of browser: User write their note inside the input and clicks the save button;

    browser->>browser: Browser push the newly created notes into its notes array;
    browser->>browser: Browser removes the first notes element;
    browser->>browser: Browser re-renders its notes list;

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa with the body content consist of {"content": "some content", "date": "some date"} with ('Content-type', 'application/json') Request Header
    activate server;
    Note left of server: Server process the data and store in inside notes array;
    server->>browser: Server sends 201 Created response to the browser;
    deactivate server;

    Note right of browser: Browser receive the response;


```