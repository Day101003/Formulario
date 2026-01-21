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
    if (this.productForm.valid) {
      const formData = this.productForm.value;
      const productData = {
        title: formData.title || '',
        price: Number(formData.price),
        description: formData.description || '',
        categoryId: Number(formData.categoryId),
        images: ['https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'],
      };

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
