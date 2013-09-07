(function($) {

	var sections = {
		'': 'api',
		'api': 'api',
		'repositories': 'repositories'
	};


	var repos = null;
	var repositoriesTab = function() {

		var drawOurRepo = function(repos) {
			var html = ['<h1>Our repositories</h1><dl class="dl-horizontal">'];
			$.each(repos, function() {
				html.push('<dt><a href="' + this.html_url + '">' + this.name + '</a></dt>');
				html.push('<dd>' + this.description + '</dd>');
			});
			html.push('</dl>');
			$('#surface').html(html.join(''));
			window.location.hash = 'repositories';
		};

		if (repos === null) {
			$('#surface').html('<div class="alert alert-info">Loading of repositories from GitHub&hellip;</div>');
			repos = [];
			var responses_needed = 2;
			for (var page = 1; page <= 2; page ++) {
				$.get("https://api.github.com/orgs/regru/repos", { type: "public", page: page })
					.success(function(data) {
						$.each(data, function() {
							repos.push({
								name: this.name,
								html_url: this.html_url,
								description: this.description
							});
						});
						responses_needed--;
						if (responses_needed === 0) {
							drawOurRepo(repos);
						}
					}).fail(function() {
						$('#surface').html('<div class="alert alert-danger">Loading of repositories from GitHub was failed.</div>');
					});
			}
		} else {
			drawOurRepo(repos);
		}
	};

	var cleanup = function() {
		$('#surface').empty();
	}

	var apiTab = function() {
		$('.api-content').clone().removeClass('hidden').appendTo('#surface');
	};

	var sectionRunners = {
		repositories: repositoriesTab,
		api: apiTab
	};

	var getHash = function(hash) {
		if (! hash) {
			hash = window.location.hash;
		}
		var m = hash.match(/\#(.+)/);
		if (m) {
			hash = m[1];
		}
		return hash;
	};

	var changeSection = function(section) {
		$('li.section').removeClass('active');
		$('li.' + section + '-section').addClass('active');
		cleanup();
		sectionRunners[section]();
	}

	$('li a[href^="#"]').click(function() {
		changeSection(sections[getHash(this.href)]);
	});

	var section = sections[getHash()];
	if (section) {
		changeSection(section);
	}

})(jQuery);