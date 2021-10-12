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

    register_graphql_field(
      'Project',
      'galleryImages',
      [
        'description' => __( 'Return images' ),
        'type' => [ 'list_of' => 'galleryImage' ],
        'resolve' => function() {
          $images = pods('project', [ 'limit' => -1 ])->field( 'gallery' );
          return empty( $images ) ? null : $images;
        }
      ]
    );
  } );

  // add featured image support
  add_theme_support('post-thumbnails', array(
    'post',
    'page',
    'projects',
  ));
?>