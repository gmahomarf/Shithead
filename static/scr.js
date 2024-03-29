$(document)
.ready(
		function()
		{
			$('#frmChat')
			.submit(
			    function(e)
			    {
			        $.post(
			            '/msg',
			            'msg='+$('#msg').val(),
			            function()
			            {
			                $('#msg').val('');
			            },
			            'json'
			            )
			        return false;
			    }
			    );
			$('#setname')
			.click(
			    function(e)
			    {
			        $.post(
			            '/name',
			            'nname='+$('#nname').val(),
			            function()
			            {
			                $('#nname').attr('readonly','readonly');
			                $('#msg').attr('disabled',false);
			                $('#send').attr('disabled',false);
			            },
			            'json'
			            )
			        return false;
			    }
			    );
			var socket = io.connect();
			socket.on('chatMsg',
			    function(data)
			    {
			        $('#chat')
			        .append(
			            $('<p></p>')
			            .append(
			            		$('<span></span>').addClass('name').html(data.name + ":")
	                )
	                .append(
	                    $('<span></span>').addClass('text').html(data.text)
                  )
              );
			        var chatHeight = $('#chat').height();
			        var chatWHeight = $('#chatWrapper').height();
			        if (chatHeight > chatWHeight)
			        	$('#chatWrapper').scrollTop(chatHeight - chatWHeight);
			    }
		    );
		}
	);