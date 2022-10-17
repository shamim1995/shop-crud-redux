
import swal from 'sweetalert'

export const swalAlert = (title, text, icon='success')=>{
    return swal({
            title: title,
            text: text,
            icon: icon,
          
            dangerMode: true,
        })
       
}





