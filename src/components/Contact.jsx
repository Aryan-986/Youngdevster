import { useState, useRef } from "react";
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';

import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { slideIn } from "../utils/motion";
import Earth from "./canvas/Earth";

const Contact = () => {
  const formRef = useRef();
  const [form, setForm] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs.send('service_qd9bdv4', // service key
      'template_nzozpi5', // template key
      {
        from_name: form.name,
        to_name: 'Aryan Karki',
        from_email: form.email,
        to_email: 'aryankarki984@gmail.com',
        message: form.message,
      },
      'C25rpdB5wB7XLJ8T4' // public key from email.js
    )
    .then(() => {
      setLoading(false);
      alert('Thank you so much. I will get back to you soon....');
      setForm({
        name: "",
        email: "",
        message: ""
      });
    }, (error) => {
      setLoading(false);
      console.log(error);
      alert('Something went wrong! Please recheck your details');
    });
  }

  return (
    <section className="contact-section bg-gray-950 py-20">
    <div className="xl:mt-12 xl:flex-row flex-col-reverse flex gap-10 overflow-hidden bg-black"> {/* Set background to black */}
      <motion.div
        variants={slideIn('left', "tween", 0.2, 1)}
        className="flex-[0.75] bg-black-100 p-8 rounded-2xl" // Transparent background for form
      >
        <p className={styles.sectionSubText}>Get in touch</p>
        <h3 className={styles.sectionHeadText}>Contact</h3>

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="mt-12 flex flex-col gap-8"
        >
          <label className="flex flex-col">
            <span className="text-white font-medium mb-4">Your Name</span>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="What's Your name?"
              className="bg-gray-800 py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium" // Dark background for input
            />
          </label>
          <label className="flex flex-col">
            <span className="text-white font-medium mb-4">Your Email</span>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="What's Your email?"
              className="bg-gray-800 py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium" // Dark background for input
            />
          </label>
          <label className="flex flex-col">
            <span className="text-white font-medium mb-4">Your Message</span>
            <textarea
              rows="7"
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="What's your idea or want to say?"
              className="bg-gray-800 py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium" // Dark background for textarea
            />
          </label>

          <button
            type="submit"
            className="bg-tertiary py-3 px-8 outlined-none w-fit text-white font-bold shadow-md shadow-primary rounded-xl"
          >
            {loading ? 'Sending...' : 'Send'}
          </button>
        </form>
      </motion.div>

      <motion.div
        variants={slideIn("right", "tween", 0.2, 1)}
        className='xl:flex-1 xl:h-auto md:h-[550px] h-[350px]'
      >
        <Earth />
      </motion.div>
    </div>
    </section>
  );
}

export default Contact;
