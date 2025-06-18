<?php
/**
 * Feed Configuration
 *
 * Handles the redirection of all feed requests to the homepage.
 *
 * @package ClubSandwich
 * @since 1.0.0
 */

/**
 * Redirect all feeds to the homepage.
 *
 * @since 1.0.0
 * @return void
 */
function redirect_all_feeds() {
	if ( is_feed() ) {
		wp_safe_redirect( home_url(), 301 );
		exit;
	}
}

// Add feed redirect hooks with early priority.
add_action( 'do_feed', 'redirect_all_feeds' );
add_action( 'do_feed_rdf', 'redirect_all_feeds', 1 );
add_action( 'do_feed_rss', 'redirect_all_feeds', 1 );
add_action( 'do_feed_rss2', 'redirect_all_feeds', 1 );
add_action( 'do_feed_atom', 'redirect_all_feeds', 1 );
add_action( 'do_feed_rss2_comments', 'redirect_all_feeds', 1 );
add_action( 'do_feed_atom_comments', 'redirect_all_feeds', 1 );
