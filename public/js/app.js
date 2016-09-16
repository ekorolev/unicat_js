
var local_data = [
	{ name: "Name1", value: "Value1" },
	{ name: "Name2223", value: "Value2" },
	{ name: "Name3", value: "Value3" },
	{ name: "Name4", value: "Value4" },
	{ name: "Name5", value: "coming soon"},
	{ name: "A", value: "B"},
	{name:"get", value:"started"}
];

var AppData = {
	array: local_data,
	new_name: null,
	new_value: null
};

$(function () {
	var el_InsertButton = $("#InsertButton");
	var el_InsertData = $("#InsertData");
	var el_GetButton = $("#GetButton");

	rivets.bind(
		$("#DataJSON"),
		{ 
			data: AppData,
			item_edit: null,
			add: function () {
				var self = this;
				AppData.array.push({
					name: AppData.new_name,
					value: AppData.new_value
				});
				AppData.new_name = null;
				AppData.new_value = null;
			}
		}
	);

	el_GetButton.on("click", function () {
		var string_data = JSON.stringify(AppData.array);
		el_InsertData.val(string_data);
	});

	el_InsertButton.on("click", function () {
		var data = el_InsertData.val();
		try {
			var json_data = JSON.parse(data);
		} catch (err) {
			alert( err );
		}

		if (!Array.isArray(json_data)) {
			alert("It is not array!");
		} else {

			AppData.array = json_data;
		}
	});

	$("body").on("click", ".ItemRemove", function (evt) {
		var index = $(evt.target).parents(".table-data").find(".index").html();

		AppData.array.splice(index, 1);
	})
	$("body").on("click", ".ItemUp", function (evt) {
		var index = $(evt.target).parents(".table-data").find(".index").html();

		if (index>0) {
			var item_name = AppData.array[index].name;
			var item_value = AppData.array[index].value;
			AppData.array.splice(index, 1);
			AppData.array.splice(index-1, 0, {name: item_name, value: item_value});
		}
	})
	$("body").on("click", ".ItemDown", function (evt) {
		var index = $(evt.target).parents(".table-data").find(".index").html();
		var length = AppData.array.length;

		if (index<length-1) {
			var item_name = AppData.array[index].name;
			var item_value = AppData.array[index].value;
			AppData.array.splice(index, 1);
			++index;
			AppData.array.splice(index, 0, {name: item_name, value: item_value});
		}
	})

});