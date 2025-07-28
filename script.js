// 1. Smooth Scrolling untuk Navigasi
document.querySelectorAll('nav ul li a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href && href.startsWith('#')) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
            document.querySelectorAll('nav ul li a').forEach(item => {
                item.classList.remove('active');
            });
            this.classList.add('active');
        }
    });
});

// 2. Dynamic Text (Typing Effect)
const typedTextSpan = document.getElementById("typed-text");
const textArray = ["Pesanan Anda", "Hidangan Favorit Anda", "Kebutuhan Katering Anda", "Semua dalam Genggaman"];
const typingDelay = 100;
const erasingDelay = 50;
const newTextDelay = 2000; 
let textArrayIndex = 0;
let charIndex = 0;

function type() {
    if (charIndex < textArray[textArrayIndex].length) {
        if (!typedTextSpan.classList.contains("typing")) typedTextSpan.classList.add("typing");
        typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
        charIndex++;
        setTimeout(type, typingDelay);
    } else {
        typedTextSpan.classList.remove("typing");
        setTimeout(erase, newTextDelay);
    }
}

function erase() {
    if (charIndex > 0) {
        if (!typedTextSpan.classList.contains("typing")) typedTextSpan.classList.add("typing");
        typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(erase, erasingDelay);
    } else {
        typedTextSpan.classList.remove("typing");
        textArrayIndex++;
        if (textArrayIndex >= textArray.length) textArrayIndex = 0;
        setTimeout(type, typingDelay + 1100);
    }
}

document.addEventListener("DOMContentLoaded", function () {
    if (textArray.length) setTimeout(type, newTextDelay + 250);
});

// 3. Counter Animation (statistik)
const counters = document.querySelectorAll('.counter');
const speed = 200; 

const animateCount = (counter) => {
    const target = +counter.dataset.target;
    let count = 0;
    const increment = target / speed;

    const updateCount = () => {
        if (count < target) {
            count += increment;
            counter.innerText = Math.ceil(count).toLocaleString('id-ID'); 
            setTimeout(updateCount, 1);
        } else {
            counter.innerText = target.toLocaleString('id-ID');
        }
    };
    updateCount();
};

const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.7 
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCount(entry.target);
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

counters.forEach(counter => {
    observer.observe(counter);
});

// 4. Fitur "Lihat Detail" (Expand/Collapse)
document.querySelectorAll('.feature-card .detail-button').forEach(button => {
    button.addEventListener('click', () => {
        const card = button.closest('.feature-card');
        card.classList.toggle('expanded');
        if (card.classList.contains('expanded')) {
            button.textContent = 'Sembunyikan Detail';
        } else {
            button.textContent = 'Lihat Detail';
        }
    });
});

// 5. Testimonial Carousel
const testimonialCarousel = document.querySelector('.testimonial-carousel');
const prevButton = document.getElementById('prev-testimonial');
const nextButton = document.getElementById('next-testimonial');

prevButton.addEventListener('click', () => {
    testimonialCarousel.scrollBy({
        left: -320, 
        behavior: 'smooth'
    });
});

nextButton.addEventListener('click', () => {
    testimonialCarousel.scrollBy({
        left: 320, 
        behavior: 'smooth'
    });
});

let autoScrollInterval;
const startAutoScroll = () => {
    autoScrollInterval = setInterval(() => {
        if (testimonialCarousel.scrollLeft + testimonialCarousel.clientWidth >= testimonialCarousel.scrollWidth - 1) {
            testimonialCarousel.scrollTo({
                left: 0,
                behavior: 'smooth'
            });
        } else {
            testimonialCarousel.scrollBy({
                left: 320,
                behavior: 'smooth'
            });
        }
    }, 5000); 
};

const stopAutoScroll = () => {
    clearInterval(autoScrollInterval);
};

startAutoScroll();

testimonialCarousel.addEventListener('mouseenter', stopAutoScroll);
testimonialCarousel.addEventListener('mouseleave', startAutoScroll);

// 6. Team Member Card Flip
document.querySelectorAll('.team-member-card').forEach(card => {
    card.addEventListener('click', () => {
        card.classList.toggle('flipped');
    });
});

// 7. Services Filter Buttons
const filterButtons = document.querySelectorAll('.filter-btn');
const serviceCards = document.querySelectorAll('.service-card-item');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        const category = button.dataset.category;

        filterButtons.forEach(btn => btn.classList.remove('active'));
        
        button.classList.add('active');

        serviceCards.forEach(card => {
            if (category === 'all' || card.dataset.category === category) {
                card.style.display = 'block'; 
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// 8. Price Calculator
const priceBtn = document.getElementById('calculate-price');
if (priceBtn) {
    priceBtn.addEventListener('click', () => {
        const distance = parseFloat(document.getElementById('distance').value);
        const weight = parseFloat(document.getElementById('weight').value);
        const estimatedCostSpan = document.getElementById('estimated-cost');

        if (isNaN(distance) || isNaN(weight) || distance <= 0 || weight <= 0) {
            estimatedCostSpan.textContent = 'Masukkan nilai yang valid!';
            estimatedCostSpan.style.color = 'red';
            return;
        }

        const baseCost = 10000; // Rp 10.000
        const costPerKm = 3000; // Rp 3.000 per KM
        const costPerKg = 1000; // Rp 1.000 per KG

        let totalCost = baseCost + (distance * costPerKm) + (weight * costPerKg);

        estimatedCostSpan.textContent = `Rp ${totalCost.toLocaleString('id-ID')}`;
        estimatedCostSpan.style.color = 'var(--primary-color)';
    });
}

// 9. Contact Form Validation
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const subjectInput = document.getElementById('subject');
    const messageInput = document.getElementById('message');
    const messageCharCount = document.getElementById('message-char-count');

    const isValidEmail = (email) => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    };

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault(); 

        let isValid = true;

        if (nameInput.value.trim() === '') {
            document.getElementById('name-error').textContent = 'Nama tidak boleh kosong.';
            isValid = false;
        } else {
            document.getElementById('name-error').textContent = '';
        }

        if (emailInput.value.trim() === '') {
            document.getElementById('email-error').textContent = 'Email tidak boleh kosong.';
            isValid = false;
        } else if (!isValidEmail(emailInput.value.trim())) {
            document.getElementById('email-error').textContent = 'Format email tidak valid.';
            isValid = false;
        } else {
            document.getElementById('email-error').textContent = '';
        }

        if (subjectInput.value.trim() === '') {
            document.getElementById('subject-error').textContent = 'Subjek tidak boleh kosong.';
            isValid = false;
        } else {
            document.getElementById('subject-error').textContent = '';
        }

        if (messageInput.value.trim() === '') {
            document.getElementById('message-error').textContent = 'Pesan tidak boleh kosong.';
            isValid = false;
        } else if (messageInput.value.trim().length < 10) {
            document.getElementById('message-error').textContent = 'Pesan minimal 10 karakter.';
            isValid = false;
        }
        else {
            document.getElementById('message-error').textContent = '';
        }

        if (isValid) {
            alert('Pesan berhasil dikirim!'); 
            contactForm.reset();
            messageCharCount.textContent = '0/500 karakter';
        }
    });

    messageInput.addEventListener('input', () => {
        const currentLength = messageInput.value.length;
        const maxLength = messageInput.maxLength;
        messageCharCount.textContent = `${currentLength}/${maxLength} karakter`;
    });
}

// 10. Chatbot Functionality
const chatMessages = document.getElementById('chat-messages');
const chatInput = document.getElementById('chat-input');
const sendChatButton = document.getElementById('send-chat');

if (chatMessages && chatInput && sendChatButton) {
    sendChatButton.addEventListener('click', () => {
        sendMessage();
    });

    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    function sendMessage() {
        const userMessageText = chatInput.value.trim();
        if (userMessageText === '') return;

        const userMessageDiv = document.createElement('div');
        userMessageDiv.classList.add('chat-message', 'user');
        userMessageDiv.textContent = userMessageText;
        chatMessages.appendChild(userMessageDiv);

        chatMessages.scrollTop = chatMessages.scrollHeight;

        chatInput.value = ''; 
        setTimeout(() => {
            const botMessageDiv = document.createElement('div');
            botMessageDiv.classList.add('chat-message', 'bot');
            
            let botResponse = "Terima kasih atas pesan Anda. Kami akan segera membalasnya.";
            if (userMessageText.toLowerCase().includes("bantuan") || userMessageText.toLowerCase().includes("tolong")) {
                botResponse = "Tentu, bagaimana kami bisa membantu Anda hari ini?";
            } else if (userMessageText.toLowerCase().includes("pesan")) {
                botResponse = "Untuk memesan, Anda bisa melihat bagian Layanan kami atau unduh aplikasi bitesybite.";
            } else if (userMessageText.toLowerCase().includes("promo")) {
                botResponse = "Kami punya banyak promo menarik! Cek halaman promo kami atau aplikasi untuk info terbaru.";
            }

            botMessageDiv.textContent = botResponse;
            chatMessages.appendChild(botMessageDiv);
            chatMessages.scrollTop = chatMessages.scrollHeight; 
        }, 1000); 
    }
}

// 11. FAQ Accordion
const accordionHeaders = document.querySelectorAll('.accordion-header');

accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
        const accordionItem = header.parentElement;
        const accordionContent = header.nextElementSibling; 

        document.querySelectorAll('.accordion-item').forEach(item => {
            if (item !== accordionItem && item.classList.contains('active')) {
                item.classList.remove('active');
                item.querySelector('.accordion-header').classList.remove('active');
                item.querySelector('.accordion-content').style.maxHeight = 0;
            }
        });

        accordionItem.classList.toggle('active');
        header.classList.toggle('active'); 

        if (accordionItem.classList.contains('active')) {
            accordionContent.style.maxHeight = accordionContent.scrollHeight + 'px'; 
        } else {
            accordionContent.style.maxHeight = 0;
        }
    });
});

// 12. FAQ Search
const faqSearchInput = document.getElementById('faq-search-input');
if (faqSearchInput) {
    faqSearchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const accordionItems = document.querySelectorAll('.accordion-item');

        accordionItems.forEach(item => {
            const headerText = item.querySelector('.accordion-header').textContent.toLowerCase();
            const contentText = item.querySelector('.accordion-content p').textContent.toLowerCase();

            if (headerText.includes(searchTerm) || contentText.includes(searchTerm)) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none'; 
            }
        });
    });
}

// 13. Project Details Modal
const projectModal = document.getElementById('projectModal');
if (projectModal) {
    const closeProjectModal = projectModal.querySelector('.close-button');
    const projectModalTitle = document.getElementById('project-modal-title');
    const projectModalDescription = document.getElementById('project-modal-description');
    const projectModalGallery = document.getElementById('project-modal-gallery');
    const projectModalTestimonialText = document.getElementById('project-modal-testimonial-text');
    const projectModalTestimonialAuthor = document.getElementById('project-modal-testimonial-author');

    const projectsData = {
        1: {
            title: "Pengembangan Aplikasi Mobile bitesybite",
            description: "Proyek ini berfokus pada pembangunan ulang aplikasi mobile bitesybite dari nol, dengan penekanan pada UI/UX yang lebih modern, peningkatan performa, dan penambahan fitur-fitur baru seperti pembayaran tanpa kontak dan personalisasi rekomendasi. Aplikasi ini dirancang untuk memberikan pengalaman pemesanan makanan yang lancar dan menyenangkan bagi jutaan pengguna kami.",
            images: [
                "https://via.placeholder.com/200x150/FF6347/FFFFFF?text=App+Screen+1",
                "https://via.placeholder.com/200x150/F7931E/FFFFFF?text=App+Screen+2",
                "https://via.placeholder.com/200x150/FFD700/FFFFFF?text=App+Screen+3"
            ],
            testimonial: {
                text: "Aplikasi bitesybite yang baru jauh lebih cepat dan intuitif! Sangat puas dengan update ini.",
                author: "- Pengguna Setia bitesybite"
            }
        },
        2: {
            title: "Integrasi AI untuk Rekomendasi Makanan",
            description: "Kami mengimplementasikan algoritma kecerdasan buatan canggih untuk menganalisis riwayat pesanan dan preferensi pengguna, memberikan rekomendasi makanan yang sangat personal dan relevan. Ini membantu pengguna menemukan hidangan baru yang mereka sukai dan meningkatkan tingkat konversi pesanan.",
            images: [
                "https://via.placeholder.com/200x150/F7931E/FFFFFF?text=AI+Mockup+1",
                "https://via.placeholder.com/200x150/FFD700/FFFFFF?text=AI+Mockup+2"
            ],
            testimonial: {
                text: "Rekomendasi AI-nya luar biasa! Saya jadi sering mencoba makanan yang sebelumnya tidak terpikirkan.",
                author: "- Food Blogger"
            }
        },
        3: {
            title: "Ekspansi ke 10 Kota Baru",
            description: "Proyek ambisius ini melibatkan peluncuran layanan bitesybite di sepuluh kota besar di seluruh Indonesia. Kami membangun infrastruktur logistik baru, merekrut ribuan pengemudi, dan menjalin kemitraan dengan ratusan restoran lokal di setiap kota untuk memastikan cakupan layanan yang luas dan efisien.",
            images: [
                "https://via.placeholder.com/200x150/FFD700/FFFFFF?text=City+Map+1",
                "https://via.placeholder.com/200x150/333333/FFFFFF?text=Team+Launch"
            ],
            testimonial: {
                text: "Senang sekali bitesybite akhirnya hadir di kota saya! Pengiriman jadi jauh lebih mudah.",
                author: "- Warga Kota Baru"
            }
        },
        4: {
            title: "Sistem Logistik Cerdas",
            description: "Pengembangan sistem logistik canggih yang menggunakan data real-time dan machine learning untuk mengoptimalkan rute pengiriman, meminimalkan waktu tunggu, dan mengelola armada pengemudi secara efisien. Proyek ini secara signifikan mengurangi biaya operasional dan meningkatkan kepuasan pengemudi serta pelanggan.",
            images: [
                "https://via.placeholder.com/200x150/333333/FFFFFF?text=Logistic+Map",
                "https://via.placeholder.com/200x150/FF6347/FFFFFF?text=Dashboard"
            ],
            testimonial: {
                text: "Pesanan selalu datang tepat waktu, bahkan saat jam sibuk. Sistem logistik mereka patut diacungi jempol!",
                author: "- Pemilik Restoran Mitra"
            }
        }
    };

    document.querySelectorAll('.view-details-btn').forEach(button => {
        button.addEventListener('click', () => {
            const projectId = button.dataset.projectId;
            const project = projectsData[projectId];

            if (project) {
                projectModalTitle.textContent = project.title;
                projectModalDescription.textContent = project.description;

                projectModalGallery.innerHTML = '';
                project.images.forEach(imgSrc => {
                    const img = document.createElement('img');
                    img.src = imgSrc;
                    img.alt = project.title;
                    projectModalGallery.appendChild(img);
                });

                projectModalTestimonialText.textContent = project.testimonial.text;
                projectModalTestimonialAuthor.textContent = project.testimonial.author;

                projectModal.style.display = 'block';
            }
        });
    });

    closeProjectModal.addEventListener('click', () => {
        projectModal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === projectModal) {
            projectModal.style.display = 'none';
        }
    });
}