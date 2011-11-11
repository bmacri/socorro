$(function() {
	/* striped tables */
	var zebra = function(table) {
	    table.find("tbody tr:odd").addClass("odd");
	}, 
	toStripe = false,
    ajaxLoader = new Image(),
    dashTables = $(".sig-dashboard-tbl", "#sig-dashboard-body");
    
    ajaxLoader.src = "../img/icons/ajax-loader.gif";
    ajaxLoader.setAttribute("id", "dash-loader");
    $(".sig-dashboard-body").append(ajaxLoader);
	
	$.getJSON(json_path, function(data) {
		var socorroDashBoardData = data,
		percentageByOsHtml = "",
		uptimeRangeHtml = "",
		productVersionsHtml = "";
		
		percentageByOsHtml = Mustache.to_html(percentageByOsTmpl, socorroDashBoardData);
		uptimeRangeHtml = Mustache.to_html(uptimeRangeTmpl, socorroDashBoardData);
		productVersionsHtml = Mustache.to_html(productVersionsTmpl, socorroDashBoardData);
		
		$(percentageByOsHtml).appendTo("#percentageByOsBody");
		$(uptimeRangeHtml).appendTo("#uptimeRangeBody");
		$(productVersionsHtml).appendTo("#productVersionsBody");
        
        $("#dash-loader").remove();
        
        dashTables.show();
		
		/* Rows are dynamically added ofter DOM ready so have to move striping code here */
		toStripe = !!$(".zebra").length;
	
		if(toStripe) {
		    $(".zebra").each(function() {
		        zebra($(this));
		    });
		}
	});
});
