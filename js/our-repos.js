(function($) {

	var drawOurRepo = function(repos) {
		var html = ['<ul>'];
		$.each(repos, function() {
			html.push('<li><a href="' + this.html_url + '">' + this.name + '</a></li>');
		});
		html.push('</ul>');
		$('#our-repos').html(html.join(''));
	};

	$.get("https://api.github.com/orgs/regru/repos", { type: "public" })
		.success(function(data) {
			var repos = [];
			$.each(data, function() {
				repos.push({
					name: this.name,
					html_url: this.html_url,
				});
			});
			drawOurRepo(repos);
		}).fail(function() {

		});

})(jQuery);