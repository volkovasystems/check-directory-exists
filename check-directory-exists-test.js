/*:
	@test-configuration:
		{
			"packageName": "dasherize-namespace",
			"fileName": "dasherize-namespace-test.js",
			"authorName": "Richeve S. Bebedor",
			"authorEMail": "richeve.bebedor@gmail.com",
			"repository": "git@github.com:volkovasystems/dasherize-namespace.git",
			"referenceFile": "dasherize-namespace.js",
			"referenceModule": "dasherizeNamespace"
		}
	@end-test-configuration

	@test-documentation:

	@end-test-documentation

	@include:
		{
			"check-directory-exists@github.com/volkovasystems": "checkDirectoryExists",
			"child_process@nodejs": "childprocess",
			"assert@nodejs": "assert",
			"os@nodejs": "os"
		}
	@end-include
*/

var removeDirectory = function removeDirectory( directory, done ){
	var command = [ ];
	if( os.platform( ) == "win32" ){
		command = [ "rd", "/Q", "/S", directory ].join( " " );

	}else{
		command = [ "rm", "-Rf", directory ].join( " " );
	}

	childprocess.exec( command, done )
};

var removeFile = function removeFile( file, done ){
	var command = [ ];
	if( os.platform( ) == "win32" ){
		command = [ "del", "/Q", file ].join( " " );

	}else{
		command = [ "rm", "-f", file ].join( " " );
	}

	childprocess.exec( command, done )
};

describe( "checkDirectoryExists",
	function testCheckDirectoryExists( ){
		it( "should return true for directory 'hello' when hello directory was created",
			function testCase( done ){
				childprocess.exec( "mkdir hello",
					function onDirectoryCreated( ){
						try{
							assert.strictEqual( checkDirectoryExists( "hello" ), true );

						}finally{
							removeDirectory( "hello", done );
						}
					} );
			} );

		it( "should return false for directory 'hello' when hello directory was not created",
			function testCase( done ){
				removeDirectory( "hello", function onDone( ){
					assert.strictEqual( checkDirectoryExists( "hello" ), false );	
					done( );
				} );
			} );

		it( "should return false for file 'hello' when hello file was created",
			function testCase( done ){
				childprocess.exec( "echo. 2>hello",
					function onFileCreated( ){
						try{
							assert.strictEqual( checkDirectoryExists( "hello" ), false );

						}finally{
							removeFile( "hello", done )
						}
					} );
			} );

		it( "should return false for file 'hello' when hello file was not created",
			function testCase( done ){
				removeFile( "hello", function onDone( ){
					assert.strictEqual( checkDirectoryExists( "hello" ), false );	
					done( );
				} );
			} );
	} );

var checkDirectoryExists = require( "./check-directory-exists.js" );

var os = require( "os" );
var childprocess = require( "child_process" );
var assert = require( "assert" );