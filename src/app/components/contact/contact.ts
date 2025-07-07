import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  // Make sure to import ReactiveFormsModule for form directives
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact.html',
  styleUrls: ['./contact.css']
})
export class Contact implements OnInit {
  contactForm!: FormGroup;
  isSubmitting = false;
  submittedSuccessfully = false;

  contactInfo = {
    address: '123 Gemstone Lane, Jewel City, 12345',
    phone: '+1 (234) 567-890',
    email: 'support@swamiprasadjewellers.com',
    whatsapp: '12345678900'
  };

    get whatsappLink(): string {
    // You can pre-fill a message to make it easier for users to start a conversation.
    const message = encodeURIComponent("Hello, I'm interested in your jewelry collection.");
    return `https://wa.me/${this.contactInfo.whatsapp}?text=${message}`;
  }

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', [Validators.required, Validators.minLength(5)]],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  // Helper getter for easy access to form controls in the template
  get f() {
    return this.contactForm.controls;
  }

  onSubmit(): void {
    if (this.contactForm.invalid) {
      // Mark all fields as touched to display validation errors
      this.contactForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    this.submittedSuccessfully = false;

    // --- Simulate backend submission ---
    // In a real application, you would send the form data to your backend here.
    // For example: this.http.post('/api/contact', this.contactForm.value).subscribe(...)
    console.log('Form Data:', this.contactForm.value);

    setTimeout(() => {
      this.isSubmitting = false;
      this.submittedSuccessfully = true;
      this.contactForm.reset();
    }, 2000); // Simulate a 2-second network delay
  }
}
