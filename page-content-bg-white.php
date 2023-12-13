<?php
/*
Template Name: 1. Page with content bg white
*/
get_header(); ?>
<div class="headspace"></div>

<?php if ( has_post_thumbnail() ) { ?>
	<div style="height:400px; text-align:center;">
		<div class="absoluteCenterWrapper" style="height: 400px; overflow:hidden; ">
			<?php the_post_thumbnail('full', array('class' => 'absoluteCenter'));?>
		</div>
	</div>
<?php } ?>

<div class="page-title_cont">
	<div class="container">
		<h1 class="page-title"><?php the_title(); ?></h1>
	</div>
</div>

<div class="main_body_cont">
	<div class="container main_body">
		<?php the_post(); ?>
		<div <?php post_class(); ?>>
			<div class="row">
				<div class="span8 offset2">
					<div class="content-wrapper">
						<?php the_content(); ?>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
<?php get_footer(); ?>