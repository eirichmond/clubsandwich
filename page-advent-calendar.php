<?php
/*
Template Name: Advent Calendar
*/

	
	$page_object = new Get_Related_Houses($post);
	
	get_header(); 
	if ( has_post_thumbnail() ) { 
?>
<div class="top-title">
	<div class="absoluteCenterWrapper">
	<?php
		$image_id = get_post_thumbnail_id();		
		$image_as_post = get_post($image_id);
		$crop_from = $image_as_post->post_content;
		if (empty($crop_from)) { $crop_from = 'absoluteCenter'; };
		
		// @TODO refactor this to dynamically pull from the backend not hardcoded
		if ($post->ID == 8405) {
			echo '<a href="'.get_permalink( 20355 ).'">';
			the_post_thumbnail('huge', array('class' => $crop_from));
			echo '</a>';		
		} else {
			the_post_thumbnail('huge', array('class' => $crop_from));
		}
		 
	?>
	</div>
</div>
<?php } else {
		echo '<div class="headspace"></div>';
	}
	
	Widget::createHeader($post->ID);
	
	Widget::createWidgets($post->ID);
	
	if ($page_object) {
		$page_object->render_associated_houses();
	}

	FooterWidgets::createWidgets($post->ID);

	get_footer();
?>