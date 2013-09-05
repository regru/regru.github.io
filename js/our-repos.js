(function($) {

	var drawOurRepo = function(repos) {
		var html = ['<dl class="dl-horizontal">'];
		$.each(repos, function() {
			html.push('<dt><a href="' + this.html_url + '">' + this.name + '</a></dt>');
			html.push('<dd>' + this.description + '</dd>');
		});
		html.push('</dl>');
		$('#our-repos').html(html.join(''));
	};

	$.get("https://api.github.com/orgs/regru/repos", { type: "public" })
		.success(function(data) {
			var repos = [];
			$.each(data, function() {
				repos.push({
					name: this.name,
					html_url: this.html_url,
					description: this.description
				});
			});
			drawOurRepo(repos);
		}).fail(function() {

		});

})(jQuery);