$(document).ready(function() {
    let xmlfile = fetch("cookbook.xml").then(res => res.text().then(txt => $("#xml").text(txt)));
    let dtdfile = fetch("cookbook.dtd").then(res => res.text().then(txt => $("#dtd").text(txt)));
    let xsdfile = fetch("cookbook.xsd").then(res => res.text().then(txt => $("#xsd").text(txt)));
});
