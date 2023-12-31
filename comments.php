<div class="container"><div class="row"><div class="span8 offset2">
<div id="comments">
<?php
$req = get_option('require_name_email');
if ( 'comments.php' == basename($_SERVER['SCRIPT_FILENAME']) )
die ( 'Please do not load this page directly.' );
if ( post_password_required() ) :
?>
<div class="nopassword"><?php _e('This post is password protected. Enter the password to view comments.', 'blankslate') ?></div>
</div>
<?php
return;
endif;
?>

	<?php if ( have_comments() ) : ?>
		<h2 class="comments-title">
			<?php
				printf( _nx( 'One thought on &ldquo;%2$s&rdquo;', '%1$s thoughts on &ldquo;%2$s&rdquo;', get_comments_number(), 'comments title', 'fittness_times' ),
					number_format_i18n( get_comments_number() ), '<span>' . get_the_title() . '</span>' );
			?>
		</h2>

		<?php if ( get_comment_pages_count() > 1 && get_option( 'page_comments' ) ) : // are there comments to navigate through ?>
		<nav id="comment-nav-above" class="comment-navigation" role="navigation">
			<h1 class="screen-reader-text"><?php _e( 'Comment navigation', 'fittness_times' ); ?></h1>
			<div class="nav-previous"><?php previous_comments_link( __( '&larr; Older Comments', 'fittness_times' ) ); ?></div>
			<div class="nav-next"><?php next_comments_link( __( 'Newer Comments &rarr;', 'fittness_times' ) ); ?></div>
		</nav><!-- #comment-nav-above -->
		<?php endif; // check for comment navigation ?>

		<ol class="comment-list">
			<?php
				wp_list_comments( array(
					'style'      => 'ol',
					'short_ping' => true,
				) );
			?>
		</ol><!-- .comment-list -->

		<?php if ( get_comment_pages_count() > 1 && get_option( 'page_comments' ) ) : // are there comments to navigate through ?>
		<nav id="comment-nav-below" class="comment-navigation" role="navigation">
			<h1 class="screen-reader-text"><?php _e( 'Comment navigation', 'fittness_times' ); ?></h1>
			<div class="nav-previous"><?php previous_comments_link( __( '&larr; Older Comments', 'fittness_times' ) ); ?></div>
			<div class="nav-next"><?php next_comments_link( __( 'Newer Comments &rarr;', 'fittness_times' ) ); ?></div>
		</nav><!-- #comment-nav-below -->
		<?php endif; // check for comment navigation ?>

	<?php endif; // have_comments() ?>


<!--
<?php if ( have_comments() ) : ?>
	<?php
	$ping_count = $comment_count = 0;
	foreach ( $comments as $comment )
	get_comment_type() == "comment" ? ++$comment_count : ++$ping_count;
	?>
	<?php if ( ! empty($comments_by_type['comment']) ) : ?>
		<div id="comments-list" class="comments">
			<h3><?php printf($comment_count > 1 ? __('<span>%d</span> Comments', 'blankslate') : __('<span>One</span> Comment', 'blankslate'), $comment_count) ?></h3>
			<?php $total_pages = get_comment_pages_count(); if ( $total_pages > 1 ) : ?>
				<div id="comments-nav-above" class="comments-navigation">
					<div class="paginated-comments-links"><?php paginate_comments_links(); ?></div>
				</div>
			<?php endif; ?>
			<ol>
				<?php wp_list_comments('type=comment&callback=blankslate_custom_comments'); ?>
			</ol>
			<?php $total_pages = get_comment_pages_count(); if ( $total_pages > 1 ) : ?>
				<div id="comments-nav-below" class="comments-navigation">
					<div class="paginated-comments-links"><?php paginate_comments_links(); ?></div>
				</div>
			<?php endif; ?>
		</div>
	<?php endif; ?>

	<?php if ( ! empty($comments_by_type['pings']) ) : ?>
		<div id="trackbacks-list" class="comments">
			<h3><?php printf($ping_count > 1 ? __('<span>%d</span> Trackbacks', 'blankslate') : __('<span>One</span> Trackback', 'blankslate'), $ping_count) ?></h3>
			<ol>
				<?php wp_list_comments('type=pings&callback=blankslate_custom_pings'); ?>
			</ol>
		</div>
	<?php endif ?>
<?php endif ?>
-->





<?php if ( 'open' == $post->comment_status ) : ?>
<div id="respond">
<h3><?php comment_form_title( __('Post a Comment', 'blankslate'), __('Post a Reply to %s', 'blankslate') ); ?></h3>
<div id="cancel-comment-reply"><?php cancel_comment_reply_link() ?></div>
<?php if ( get_option('comment_registration') && !$user_ID ) : ?>
<p id="login-req"><?php printf(__('You must be <a href="%s" title="Log in">logged in</a> to Post a Comment.', 'blankslate'),
get_option('siteurl') . '/wp-login.php?redirect_to=' . get_permalink() ) ?></p>
<?php else : ?>
<div class="formcontainer">
<form id="commentform" action="<?php echo get_option('siteurl'); ?>/wp-comments-post.php" method="post">
<div>
<?php if ( $user_ID ) : ?>
<p id="login"><?php printf(__('<span class="loggedin">Logged in as <a href="%1$s" title="Logged in as %2$s">%2$s</a>.</span> <span class="logout"><a href="%3$s" title="Log out of this account">Log out?</a></span>', 'blankslate'),
get_option('siteurl') . '/wp-admin/profile.php',
esc_html($user_identity, true),
wp_logout_url(get_permalink()) ) ?></p>
<?php else : ?>
<p id="comment-notes"><?php _e('Your email is kept private.', 'blankslate') ?> <?php if ($req) _e('Required fields are marked <span class="required">*</span>', 'blankslate') ?></p>
<div id="form-section-author" class="form-section">
<div class="form-label"><label for="author"><?php _e('Name', 'blankslate') ?></label> <?php if ($req) _e('<span class="required">*</span>', 'blankslate') ?></div>
<div class="form-input"><input id="author" name="author" type="text" value="<?php echo $comment_author ?>" size="30" maxlength="20" tabindex="3" /></div>
</div>
<div id="form-section-email" class="form-section">
<div class="form-label"><label for="email"><?php _e('Email', 'blankslate') ?></label> <?php if ($req) _e('<span class="required">*</span>', 'blankslate') ?></div>
<div class="form-input"><input id="email" name="email" type="text" value="<?php echo $comment_author_email ?>" size="30" maxlength="50" tabindex="4" /></div>
</div>
<div id="form-section-url" class="form-section">
<div class="form-label"><label for="url"><?php _e('Website', 'blankslate') ?></label></div>
<div class="form-input"><input id="url" name="url" type="text" value="<?php echo $comment_author_url ?>" size="30" maxlength="50" tabindex="5" /></div>
</div>
<?php endif ?>
<div id="form-section-comment" class="form-section">
<div class="form-label"><label for="comment"><?php _e('Comment', 'blankslate') ?></label></div>
<div class="form-textarea"><textarea id="comment" name="comment" cols="45" rows="8" tabindex="6"></textarea></div>
</div>
<?php do_action('comment_form()', $post->ID); ?>
<div class="form-submit"><input id="submit" name="submit" type="submit" value="<?php _e('Post Comment', 'blankslate') ?>" tabindex="7" /><input type="hidden" name="comment_post_ID" value="<?php echo $id; ?>" /></div>
<?php comment_id_fields(); ?>
</div>
</form>
</div>
<?php endif ?>
</div>
<?php endif ?>
</div>
</div></div></div>