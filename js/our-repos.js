(function($) {

	var data = [];

	var drawOurRepo = function() {
		var html = ['<ul>'];
		$.each(data, function() {
			html.push('<li><a href="' + data.html_url + '">' + data.name + '</a></li>');
		});
		html.push('</ul>');
		$('#our-repo').html(html.join(''));
	}

	$.get("https://api.github.com/orgs/regru/repos", { type: "public" })
		.success(function(data) {
			$.each(data, function() {
				data.push({
					name: this.name,
					html_url: this.html_url,
				});
			});
			drawOurRepo();
		}).fail(function() {

		});

})(jQuery);