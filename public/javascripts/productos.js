$(function(){
    //funcion ajax
    $('#tbl-productos #btn-eliminar').click(function(e){
        e.preventDefault();
        var elemento = $(this);
        var id = elemento.parent().parent().find('#id_producto').text();

        var confirmar = confirm('¿Desea eliminar el producto?');
        if(confirmar){
         $.ajax({
            url: 'http://localhost:3000/eliminarproducto',
            method: 'post',
            data: {id : id},
            success: function(res){
                if(res.res){
                    elemento.parent().parent().remove();
                }
            }
        });
        }
    });
});