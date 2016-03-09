(function(){
	var testNodes = {
		id: "id-sample",
		name: "Sample tree",
		sheets: [
			"4f775f06-677e-4c88-82c2-b08cf7671980",
			"5813902b-009c-412a-aeef-3a5fdf8649d2",
			"0d8f177f-5991-4102-aaeb-f6f6e3c22057",
			"86970af3-5324-4d0e-954a-d613749174e4",
			"ff30a149-7fe5-4ef2-b4b4-69649b782ee5",
			"4cb2ad80-7c03-4ac2-8338-167aeab326c6",
			"a94a59e8-438d-4083-a140-0308be70c912",
			"9230f383-3067-4a3d-98df-494ad596553f",
			"b9454567-c719-4e30-8620-7582fc923bb0",
			"afd03c6b-f99a-4be7-83bd-ad2936d1ae61",
			"9415731e-1964-4ade-8374-0235f24eeca4",
			"99671441-40a1-4d68-b036-4203c5b93579",
			"fd7bad97-5b6d-4081-8033-65579a5d04d9",
			"3505d45f-41af-450f-a23a-32150a9f60bd"
		]
	};
	
	var genTestPage = function(doc) {
		var divContainer = document.getElementById('leftPanel');
		var headerDiv = document.createElement('div');

		var headerH2 = document.createElement('h4');
		headerH2.innerHTML = doc.name;
		headerDiv.appendChild(headerH2);

		divContainer.appendChild(headerDiv);

		var eleUL = document.createElement('ul');
		var docSheets = doc.sheets;

		docSheets.forEach(function(sheet, index){
			var eleLi = document.createElement('li');
			eleLi.addEventListener('click', function(){
				alert('Item click!' + sheet + ' at index ' + index + '.');
			});
			eleLi.innerHTML = "Sheet " + (index + 1);
			eleUL.appendChild(eleLi);
		});
		divContainer.appendChild(eleUL);
	};

	genTestPage(testNodes);
})();
