/*
Copyright (c) 2010, Pawel 'MePhiR' Wilk <pawel@wilk.pro>
License see http://creativecommons.org/licenses/by-sa/3.0/
*/
var imce_file;
( function() {
  CKEDITOR.plugins.add( 'imce',
  {
    init: function( editor )
    {
      //adding button 
      editor.ui.addButton( 'IMCE',
      {
        label: 'IMCE',
        command: 'IMCEWindow',
        icon: this.path + 'images/icon.gif'
      });
    
      //opening imce window
      editor.addCommand( 'IMCEWindow', {
        exec : function () {
			    var width = editor.config.filebrowserWindowWidth || '80%',
			      height = editor.config.filebrowserWindowHeight || '70%';
			    
          editor.popup(Drupal.settings.basePath + 'index.php?q=imce\x26app=ckeditor|sendto@ckeditor_setFile|&CKEditorFuncNum=' + editor._.filebrowserFn, width, height);
        }
      });
      
      //add editor function
      editor._.filebrowserFn = CKEDITOR.tools.addFunction( setFile, editor )
      
      //function which receive imce response
      window.ckeditor_setFile = function (file, win) {
			  var cfunc = win.location.href.split('&');
			
			  for (var x in cfunc) {
			    if (cfunc[x].match(/^CKEditorFuncNum=\d+$/)) {
			      cfunc = cfunc[x].split('=');
			      break;
			    }
			  }
			  
			  CKEDITOR.tools.callFunction(cfunc[1], file);
        win.close();
      };
    }
  } );
  function setFile(file) {
    imce_file = file;
    //checking if it is image
    if (file.width != 0 && file.height != 0) {
      this.insertHtml('<img src="' + file.url + '" width="' + file.width + '" height="' + file.height + '" alt="' + file.name + '" />');
    } else {
      this.insertHtml('<a href="' + file.url + '">' + file.name + '</a>');
    }
  }
} )();
