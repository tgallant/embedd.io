---
layout: post.html
---

# Usage

Embedd allows you to display reddit and/or HackerNews comments on your
website. The intended use case is for blogs and product pages,
although it is configurable enough for other cases.

All API queries happen in the browser so you don't have to rely on a
separate third party (other than reddit and HackerNews). I am hosting
the file at https://embedd.io/embedd.min.js but it will work just the
same if you download the code and host it yourself.

You can get started right now by adding the following script tag to
your website.

<div class="code">
```
<script src="https://embedd.io/embedd.min.js"></script>
```
</div>

The default behavior is to search reddit and HackerNews for all posts
that link to the URL of the current page. For each reddit and
HackerNews, if there are multiple threads with comments it will merge
them together in a single thread. If your post has been posted in both
places there will be a button to toggle between the views. It will
default to showing reddit comments first.

## Configuration

There are various configuration options you can set to alter the
behavior as stated above.

Here is an example with all possible configuration options set.

<div class="code">

<pre>```<script src="embedd.js">
	{
		"url": "https://www.eff.org/deeplinks/2015/10/closing-loopholes-europes-net-neutrality-compromise",
		"element": "#embeddSection",
		"dark": true,
		"both": false,
		"service": "hn",
		"loadMore": false,
		"infiniteScroll": true,
		"limit": 10,
		"debug": true
	} 
</script>```</pre>

</div>

**url**: (default: current URL) The `url` option will use the URL
  that is passed as the search query for reddit and/or HackerNews.

**element**: (default: a new DOM element is created) The `element`
  option allows you to use a custom DOM element for containing the
  generated HTML. It accepts strings in the form of a query selector,
  e.g "#embeddSection" or ".commentSection .hnComments".

**dark**: (default: `false`) The `dark` option will enable the
  dark theme. This is optimal for sites with a dark background.

**both**: (default: `true`) The `both` option is for only
  displaying comments from a single service. If `service` is not set,
  setting this option will default to only display reddit comments.

**service**: (default: "reddit") The `service` option sets which
  service to display comments from on page load. Possible options are
  `"reddit"` and `"hn"`.

**limit**: (default: 5) The `limit` option sets how many top-level
  comments to display at a time. Setting `limit` to 0 will display all
  top-level comments.

**loadMore**: (default: `true`) The `loadMore` option toggles whether
  or not to display a "Load More" button. (works in conjunction with
  the `limit` option.)

**infiniteScroll**: (default: `false`) Setting this to `true` will
  enable infinite scrolling, where more comments will be loaded as you
  reach the end of the section. (works in conjunction with the `limit`
  option.)

**debug**: (default: `false`) Setting this to `true` will enable some
  useful data to log out to the console.
