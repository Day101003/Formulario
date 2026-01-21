import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent {
  productForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    price: new FormControl(0, [Validators.required, Validators.min(0.01)]),
    description: new FormControl('', [Validators.required]),
    categoryId: new FormControl(null, [Validators.required]),
  });

  onSubmit() {
    // Copilot me explico como utilizar los metodos definidos por ReactiveForms para los inputs que se validaran y enviaran en el JSON
    if (this.productForm.valid) {
      const formData = this.productForm.value;
      const productData = {
        title: formData.title || '',
        price: Number(formData.price),
        description: formData.description || '',
        categoryId: Number(formData.categoryId),
        images: [
          'https://placehold.co/600x400',
        ],
      };
      // Copilot me explico como consumir por medio de fecth la API de escuela JS
      fetch('https://api.escuelajs.co/api/v1/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Error en la respuesta de la API: ' + response.status);
          }
          return response.json();
        })
        .then((data) => {
          alert('Producto creado exitosamente: ' + JSON.stringify(data));
          this.productForm.reset();
        })
        .catch((error) => {
          alert('Error al crear el producto: ' + error.message);
        });
    } else {
      this.productForm.markAllAsTouched();
      alert('El formulario es inválido. Revisa los campos requeridos.');
    }
  }
}
