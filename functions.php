<?php
  add_filter( 'register_post_type_args', function( $args, $post_type ) {

    if ( 'project' === $post_type ) {
      $args['show_in_graphql'] = true;
      $args['graphql_single_name'] = 'project';
      $args['graphql_plural_name'] = 'projects';
    }

    return $args;

  }, 10, 2 );

  add_action( 'graphql_register_types', function() {


    register_graphql_object_type(
      'GalleryImage',
      [
        'description' => __( 'Gallery Image' ),
        'fields'  => [
          'guid'  => [
            'type'  => 'String',
            'description' => 'image guid'
          ]
        ],
      ]
    );
	  
	  $field_config = [
      'type' => [ 'list_of' => 'GalleryImage' ],
      'resolve' => function() {
        $images = pods('project', [ 'limit' => -1 ])->field( 'gallery' );
        return empty( $images ) ? null : $images;
      }
    ];

    register_graphql_field(
      'Project',
      'galleryImages',
		  $field_config
    );
  });

  add_action( 'graphql_register_types', function() {

    $field_config = [
      'type' => 'Boolean',
      'resolve' => function($root) {
        return get_post_field('grid_image', $root->ID);
      }
    ];
    
    register_graphql_field(
      'MediaItem',
      'gridImage',
      $field_config);
  });

  // add featured image support
  add_theme_support('post-thumbnails', array(
    'post',
    'page',
    'projects',
  ));
?>