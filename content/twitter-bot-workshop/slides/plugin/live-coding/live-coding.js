/**
 * LiveCoding 0.2 for Reveal.js
 * Vincent De Oliveira
 */
var LiveCoding = (function() {
	
	// All <code> with ".liveCoding" class
	var codeElementList = document.querySelectorAll('code.liveCoding');

	for (var i = 0; i < codeElementList.length; i++) {
		update(codeElementList[i]);
		
		// Remove autocorrect feature from the input.
		codeElementList[i].setAttribute('autocorrect', 'off');
		codeElementList[i].setAttribute('autocapitalize', 'off');
		codeElementList[i].setAttribute('autocomplete', 'off');
		codeElementList[i].spellcheck = false;

		// update when keyUp
		codeElementList[i].addEventListener('keyup', function() {
			update(this);
		});
	}

	/**
	 * Update
	 */
	function update(codeElement) {

		var demoElementId = codeElement.attributes.getNamedItem('data-livecoding-id').nodeValue;
		var demoElement = document.getElementById(demoElementId);
        var json = JSON.parse(codeElement.textContent);
        var grammar = tracery.createGrammar(json);
        grammar.addModifiers(baseEngModifiers);
        var out = grammar.flatten("#origin#");
		demoElement.innerHTML = out;
		
		function insertAfter(referenceNode, newNode) {
			referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
		}
	}

})();
