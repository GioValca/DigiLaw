function loadResult(){
  $("#whole").hide();
  if ($("#defaultUnchecked").is(':checked')) {
    console.log("AAAAAAAAAAA");
  }
  if($("#c1").is(':checked') || $("#c2").is(':checked') || $("#c3").is(':checked') || $("#c4").is(':checked') ||
    $("#c5").is(':checked') || $("#c6").is(':checked') || $("#c7").is(':checked') || $("#c8").is(':checked')){
    if (verifyRadioButton("q1") || verifyRadioButton("q2") || verifyRadioButton("q3") || verifyRadioButton("q4")) {
      compliance();
    } else {
      noCompliance();
    }
  } else {
    compliance();
  }

}

function verifyRadioButton(q) {
  console.log("checking q");
  const rbs = document.querySelectorAll('input[name="'+ q + '"]');
            let selectedValue;
            for (const rb of rbs) {
                if (rb.checked) {
                    selectedValue = rb.value;
                    break;
                }
            }
            if (selectedValue == "yes") {
              console.log("true");
              return true
            } else {
              console.log("true");
              return false
            }
}


function noCompliance(){
  var para = document.createElement("p");
  var br = document.createElement("br");
  var node = document.createTextNode("The previous paragraph is the article in which the parts highlighted in red are the ones that are not compliant with the GDPR regualation.");
  para.appendChild(node);

  var element = document.getElementById("article");
  element.appendChild(br);
  element.appendChild(para);

  var myText = document.getElementById("title").innerHTML;
  var marked = myText.replace("Article 9", "You are not compliant with Article 9!")
  document.getElementById("title").innerHTML = marked;
  console.log("no compliance");
  suggestion();
  insertParagraph("To be compliant with the GDPR avoid the following data:")
  if ($("#c1").is(':checked')){
    marker("racial or ethnic origin");
    insertParagraph("- racial or ethnic origin data");
  }
  if ($("#c2").is(':checked')){
    marker("political opinions");
    insertParagraph("- political opinions data");
  }
  if ($("#c3").is(':checked')){
    marker("religious or philosophical beliefs");
    insertParagraph("- religious or philosophical beliefs data");
  }
  if ($("#c4").is(':checked')){
    marker("trade union membership");
    insertParagraph("- trade union membership data");
  }
  if ($("#c5").is(':checked')){
    marker("genetic");
    insertParagraph("- genetic data");
  }
  if ($("#c6").is(':checked')){
    marker("biometric data for the purpose of uniquely identifying a natural person, data concerning health");
    insertParagraph("- biometric data for the purpose of uniquely identifying a natural person and data concerning health");
  }
  if ($("#c7").is(':checked')){
    marker("natural person's sex life");
    insertParagraph("- natural person's sex life data");
  }
  if ($("#c8").is(':checked')){
    marker("sexual orientation");
    insertParagraph("- sexual orientation data");
  }

  insertParagraph("If you need more help click on the following button to meet our lawyer.");
  insertButton();

}

function compliance(){
  console.log("compliance");
  var myText = document.getElementById("title").innerHTML;
  var marked = myText.replace("Article 9", "You are compliant with Article 9!")
  document.getElementById("title").innerHTML = marked;

}

function suggestion(){
  var para = document.createElement("h5");
  var br = document.createElement("br");
  var node = document.createTextNode("Suggestion: ");
  para.appendChild(node);

  var element = document.getElementById("article");
  element.appendChild(br);
  element.appendChild(para);


}


function marker(text) {
  var myText = document.getElementById("article").innerHTML;
  var textToLookFor= text;
  var marked = myText.replace(textToLookFor, "<mark>" + textToLookFor + "</mark>")
  document.getElementById("article").innerHTML = marked;
}

function insertParagraph(txt){
  var para = document.createElement("p");
  var node = document.createTextNode(txt);
  para.appendChild(node);
  var element = document.getElementById("article");
  element.appendChild(para);
}

function insertButton(){
  // 1. Create the button
  var myButton = document.createElement('<button type="submit" class="our-button-color btn" id="btnContactUs"  onClick="location.href="test.html"";> Check your compliance! </button>');
  //button.innerHTML = " Contact our Lawyer ";

  var body = document.getElementById("article");
  body.appendChild(myButton);

  myButton.addEventListener ("click", function() {
    alert("Sorry, but this feature is not yet avaiable.");
  });
}

function insertButton1(){
var body = document.getElementById("article");
body.append($('<button>Test</button>').click(function () { alert('This feature is not yet avaiable.'); }));
}
