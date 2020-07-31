window.onload = function () {
	var butn = document.querySelector("#addButton");
	var input = document.querySelector("input");
	var keyword = document.querySelector("#keywords-list");

	let db = null;
	const createdb = () => {
		return new Promise(function (resolve) {
			const request = indexedDB.open("content-blocker", 1);

			request.onupgradeneeded = (e) => {
				console.log("updatte");
				db = e.target.result;
				db.createObjectStore("cb_keywords", {
					keypath: "keyword",
					autoIncrement: true,
				});
			};

			request.onsuccess = (e) => {
				db = e.target.result;
				console.log("success");
				return resolve(db);
			};
			request.onerror = (e) => {
				console.log("error" + e.target.errror);
			};
		});
	};
	createdb();
	createdb().then((result)=>{
		viewNotes(result)
	})

	butn.addEventListener("click", () => {
		if (input.value) {
			keyword.innerHTML =
				"<div class=keyword-element>" +
				input.value +
				"</div>" +
				keyword.innerHTML;

			const tx = db.transaction("cb_keywords", "readwrite");
			const pNotes = tx.objectStore("cb_keywords");
			var obj = { keyword: input.value };
			pNotes.add(obj);
			input.value = "";
		}
	});

	async function viewNotes(db) {
		const tx = db.transaction("cb_keywords", "readonly");
		const pNotes = tx.objectStore("cb_keywords");
		const request = pNotes.openCursor();

		request.onsuccess = async (e) => {
			const cursor = await e.target.result;

			if (cursor) {
				console.log(`keyword: ${cursor.value.keyword} `);
				//do something with the cursor
				keyword.innerHTML =
					"<div class=keyword-element>" +
					cursor.value.keyword +
					'<button class="remove" id="' +
					"onclick={console.log(`jejejjjeje`)}" +
					cursor.key +
					'" >Delete</button></div>' +
					keyword.innerHTML;
				cursor.continue();
			}
		};
	}
};
