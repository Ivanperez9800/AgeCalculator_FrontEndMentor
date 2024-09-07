const form = document.querySelector('form');
const btn = document.querySelector('img');

const error_date = document.querySelector('#date_error');
const fechaActual = moment();



const fields = [
    {
        element: document.querySelector('#day'),
        validation: (value) => isNaN(value) || value < 0 || value > 31,
        error: document.querySelector('#day').nextElementSibling,
        message: "Must be a valid day"
    },
    {
        element: document.querySelector('#month'),
        validation: (value) => isNaN(value) || value < 0 || value > 12,
        error: document.querySelector('#month').nextElementSibling,
        message: "must be a valid month"
    },
    {
        element: document.querySelector('#year'),
        validation: (value) => isNaN(value) || value < 1970 || value > 2024,
        error: document.querySelector('#year').nextElementSibling,
        message: "must be a valid year"
    }
]


fields.forEach((field) => {
    field.element.addEventListener('input', (e) => {
        field.element.value = field.element.value.replace(/[^0-9]/g, '');
    })
})

btn.addEventListener('click', (e) => {
    e.preventDefault();

    let isAllFieldsValid = true;

    fields.forEach((field) => {
        if (field.validation(field.element.value)) {
            field.error.style.display = 'block';
            field.error.innerText = field.message;
            isAllFieldsValid = false;
            return;
        }
        field.error.style.display = 'none';
    });

    if (isAllFieldsValid) {
        const day = document.querySelector('#day').value < 10 ? `0${document.querySelector('#day').value}` : document.querySelector('#day').value;
        const month = document.querySelector('#month').value < 10 ? `0${document.querySelector('#month').value}` : document.querySelector('#month').value;
        const year = document.querySelector('#year').value;

        const fecha_moment = moment(`${day}-${month}-${year}`, 'DD MM YYYY');

        if (fecha_moment.isValid()) {
            if (fecha_moment.isBefore(fechaActual)) {
                error_date.style.display = 'none';
                output_date(fechaActual, fecha_moment,);
            }else{
                error_date.style.display = 'block';
                error_date.innerText = 'Must be in the past';

                

    document.querySelector('.output_year').innerText = "--";
    document.querySelector('.output_month').innerText = "--";
    document.querySelector('.output_day').innerText = "--";
            }
        } else {
            error_date.style.display = 'block';
            error_date.innerText = 'Must be a valid date';
        
            
            document.querySelector('.output_year').innerText = "--";
            document.querySelector('.output_month').innerText = "--";
            document.querySelector('.output_day').innerText = "--";
        
        }

    }
});


const output_date = (actual, pasado) => {

    const diferencia = moment.duration(actual.diff(pasado));

    const year = diferencia.years();
    const month = diferencia.months();
    const days = diferencia.days();


    document.querySelector('.output_year').innerText = year;
    document.querySelector('.output_month').innerText = month;
    document.querySelector('.output_day').innerText = days;

}
