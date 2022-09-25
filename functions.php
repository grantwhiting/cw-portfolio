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

    // register gallery field
    register_graphql_object_type( 'GalleryImage', [
      'description' => __( 'A gallery image from a project' ),
      'fields'  => [
        'guid'  => [
          'type'  => 'String',
          'description' => __( 'The guid string value for the image' )
        ]
      ],
    ] );
	  
	  $gallery_image_field_config = [
      'type' => [ 'list_of' => 'GalleryImage' ],
      'resolve' => function( $proj ) {
        $whereClause = "`t`.`ID` = " . strval( $proj->ID ) . "";
        $params = array(
          'limit' => -1,
          'where' => $whereClause
        );
        $images = pods('project', $params)->field( 'gallery' );
        return empty( $images ) ? null : $images;
      }
    ];

    register_graphql_field(
      'Project',
      'galleryImages',
		  $gallery_image_field_config
    );

    // mail stuff
    add_action( 'phpmailer_init', 'send_smtp_email' );
    function send_smtp_email( $phpmailer ) {
      $phpmailer->isSMTP();
      $phpmailer->Host       = SMTP_HOST;
      $phpmailer->SMTPAuth   = SMTP_AUTH;
      $phpmailer->Port       = SMTP_PORT;
      $phpmailer->SMTPSecure = SMTP_SECURE;
      $phpmailer->Username   = SMTP_USERNAME;
      $phpmailer->Password   = SMTP_PASSWORD;
      $phpmailer->From       = SMTP_FROM;
      $phpmailer->FromName   = SMTP_FROMNAME;
    }

    register_graphql_mutation( 'createSubmission', [
      'inputFields' => [
        'name' => [
          'type' => 'String',
          'description' => 'User Full Name'
        ],
        'email' => [
          'type' => 'String',
          'description' => 'User Email Address'
        ],
        'message' => [
          'type' => 'String',
          'description' => 'User Entered Message'
        ]
      ],
      'outputFields' => [
        'success' => [
          'type' => 'Boolean',
          'description' => 'Whether or not the form submission was successful',
          'resolve' => function ( $payload, $args, $context, $info ) {
            return isset( $payload['success'] ) ? $payload['success'] : null;
          }
        ],
        'data' => [
          'type' => 'String',
          'description' => 'Payload of submitted fields',
          'resolve' => function ( $payload, $args, $context, $info ) {
            return isset( $payload['data'] ) ? $payload['data'] : null;
          }
        ]
      ],
      'mutateAndGetPayload' => function( $input, $context, $info ) {

        if ( !class_exists( 'ACF' ) ) {
          return [
            'success' => false,
            'data' => 'ACF is not installed'
          ];
        }

        $sanitized_data = [];
        $errors = [];
        $acceptable_fields = [
          'name' => 'field_61cf3cb220daa',
          'email' => 'field_61cf3cb720dab',
          'message' => 'field_61cf3cbc20dac'
        ];

			foreach ( $acceptable_fields as $field_key => $acf_key ) {
				if ( !empty($input[$field_key] ) ) {
					$sanitized_data[$field_key] = sanitize_text_field( $input[$field_key] );
				} else {
					$errors[] = $field_key . ' was not filled out.';
				}
			}

        if ( !empty( $errors ) ) {
          return [
            'success' => false,
            'data' => $errors
          ];
        }

        $form_submission = wp_insert_post([
          'post_type' => 'form_submission',
          'post_title' => $sanitized_data['name']
        ], true);

        if ( is_wp_error( $form_submission ) ) {
          return [
            'success' => false,
            'data' => $form_submission->get_error_message()
          ];
        }

        foreach ($acceptable_fields as $field_key => $acf_key) {
          update_field($acf_key, $sanitized_data[$field_key], $form_submission);
        }

        // send email
        // $contactName = $sanitized_data['name'];
        // $contactEmail = $sanitized_data['email'];
        // $contactMessage = $sanitized_data['message'];

        // $to = 'whiting.grant@gmail.com';
        // $subject = 'Work inquiry message: ' . $contactName;
        // $headers = 'From: '. $contactEmail . "\r\n" .
        // 'Reply-To: ' . $contactEmail . "\r\n";
        // wp_mail( $to, $subject, strip_tags( $contactMessage ), $headers );

        wp_mail("recipient@example.com", "Subject", "Message");

        return [
          'success' => true,
          'data' => json_encode( $sanitized_data )
        ];

      }
    ] );

  } );

  // add featured image support
  add_theme_support(
    'post-thumbnails',
    array(
      'post',
      'page',
      'project',
    ));
?>