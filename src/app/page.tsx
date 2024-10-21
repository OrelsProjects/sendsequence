"use client";

import React from "react";
import Head from "next/head";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { FaUserCircle } from "react-icons/fa";
import { v4 as uuidv4 } from "uuid";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../components/ui/dialog";
import { Input } from "../components/ui/input";
import { useFormik } from "formik";
import axios from "axios";
import { toast } from "react-toastify";

const reviews = [
  {
    id: uuidv4(),
    name: "Anfernee",
    text: "Anfernee is a solopreneur who has helped over 15,000 fellow solopreneurs.",
    about:
      "Helping more than 15,000 solopreneurs get more done and earn more with Notion and AI solutions | Post about solopreneurship, productivity, Notion and AI.",
    img: "/reviews/anfernee.jpg",
    url: "https://substack.com/@anferneeck",
  },
  {
    id: uuidv4(),
    name: "David Mcllroy",
    text: "With over 13,000 subscribers, David is interested in the product.",
    about:
      "I help writers make a living from their words. ✍️ Constantly experimenting, always transparent. Full-time solopreneur, writer and newsletter growth nerd. Lives in Northern Ireland.",
    img: "/reviews/david-mcllroy.jpg",
    url: "https://substack.com/@thedavidmcilroy",
  },
  {
    id: uuidv4(),
    name: "Maya Sayvanova",
    text: "I'm absolutely interested in SendSequence! It will make our lives much easier.",
    about:
      "6-Figure Writer & Marketing Strategist | Featured in Business Insider | Blogger with 250K views",
    img: "/reviews/maya-sayvanova.jpg",
    url: "https://substack.com/@mayasayvanova",
  },
];

// Animation variants (as before)
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.3,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

export default function Home() {
  const [showEmailDialog, setShowEmailDialog] = useState(false);
  const [showRequestService, setShowRequestService] = useState(false);

  const [loadingSignUp, setLoadingSignUp] = React.useState(false);
  const [signUpCompleted, setSignUpCompleted] = React.useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    onSubmit: async values => {
      if (!values.email) {
        formik.setErrors({ email: "Email is required" });
      } else {
        await signUserUp(values.email);
      }
    },
  });

  const signUserUp = async (email: string) => {
    if (loadingSignUp) return;
    setLoadingSignUp(true);
    try {
      await axios.post("api/sign-interested-user", { email });
      setSignUpCompleted(true); // Update the state here
    } catch (error) {
      toast.error("Something went wrong... try again :)");
    } finally {
      // setSignUpCompleted(true)
      setLoadingSignUp(false);
    }
  };

  return (
    <>
      <Head>
        <title>
          Automate Sequences for New Subscribers |{" "}
          {process.env.NEXT_PUBLIC_APP_NAME}
        </title>
        <meta
          name="description"
          content="Be the first to engage with your new Substack or Medium subscribers by automatically sending personalized sequences. A unique feature only we provide."
        />
        <meta
          name="keywords"
          content="Substack, Medium, Subscriber Automation, Email Sequences, Audience Growth"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Header />

      <main className="text-foreground">
        {/* Hero Section */}
        <motion.section
          className="text-center py-20 px-4 bg-primary/40 text-foreground"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.h1
            className="text-4xl md:text-6xl font-bold mb-6"
            variants={fadeInUp}
          >
            Automatically Send Sequences to New Subscribers
          </motion.h1>
          <motion.p
            className="text-lg md:text-2xl mb-8"
            variants={fadeInUp}
            custom={1.5}
          >
            The only tool that instantly engages your new Substack or Medium
            subscribers with personalized sequences.
          </motion.p>
          <motion.div variants={fadeInUp} custom={2}>
            <Button size="lg" onClick={() => setShowEmailDialog(true)}>
              I am interested!
            </Button>
          </motion.div>
        </motion.section>

        {/* How It Works Section */}
        <motion.section
          id="how-it-works"
          className="py-16 px-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <div className="max-w-4xl mx-auto">
            <motion.h2
              className="text-3xl md:text-4xl font-bold mb-4"
              variants={fadeInUp}
            >
              How It Works
            </motion.h2>
            <motion.p
              className="text-base md:text-lg mb-6"
              variants={fadeInUp}
              custom={1.5}
            >
              We connect with your Gmail account to detect new subscriber emails
              from Substack or Medium. As soon as a new subscriber joins, we
              automatically send them a sequence of personalized emails that you
              set up. We&apos;ll handle all the technical details, so you can
              focus on your content.
            </motion.p>
          </div>
        </motion.section>

        {/* Benefits Section */}
        <motion.section
          id="benefits"
          className="bg-muted text-muted-foreground py-16 px-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <div className="max-w-4xl mx-auto">
            <motion.h2
              className="text-3xl md:text-4xl font-bold mb-4"
              variants={fadeInUp}
            >
              Why Our Sequence Sending Stands Out
            </motion.h2>
            <motion.ul
              className="list-disc list-inside text-base md:text-lg space-y-4"
              variants={staggerContainer}
            >
              <motion.li variants={fadeInUp}>
                <strong>Unique Automation:</strong> We&apos;re the only platform
                that automates sequence sending to your new subscribers from
                Substack or Medium.
              </motion.li>
              <motion.li variants={fadeInUp} custom={1.5}>
                <strong>Instant Engagement:</strong> Connect with your audience
                immediately, increasing retention and satisfaction.
              </motion.li>
              <motion.li variants={fadeInUp} custom={2}>
                <strong>Set It and Forget It:</strong> Create your sequences
                once, and we&apos;ll ensure every new subscriber receives them
                without any extra effort from you.
              </motion.li>
            </motion.ul>
          </div>
        </motion.section>

        {/* Testimonials Section */}
        <motion.section
          id="testimonials"
          className="py-16 px-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <div className="max-w-6xl mx-auto text-center">
            <motion.h2 className="text-3xl font-bold mb-12" variants={fadeInUp}>
              Waiting List
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {reviews.map((review, index) => {
                // Prepare the content to avoid duplication
                const ReviewerContent = (
                  <>
                    {review.img ? (
                      <img
                        src={review.img}
                        alt={review.name}
                        className="w-16 h-16 rounded-full mr-4"
                      />
                    ) : (
                      <FaUserCircle className="text-6xl text-primary mr-4" />
                    )}
                    <h3 className="text-xl font-semibold">{review.name}</h3>
                  </>
                );

                return (
                  <motion.div
                    key={review.id}
                    className="bg-card text-card-foreground p-6 rounded-lg shadow-md"
                    variants={fadeInUp}
                    custom={index * 0.5}
                  >
                    <div className="flex flex-row items-center mb-4">
                      {review.url ? (
                        <a
                          href={review.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center"
                        >
                          {ReviewerContent}
                        </a>
                      ) : (
                        <div className="flex items-center">
                          {ReviewerContent}
                        </div>
                      )}
                    </div>
                    <p className="text-lg">{review.text}</p>
                    <p className="text-sm text-muted-foreground/60 mt-2">
                      {review.about}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.section>

        {/* Time Saved Section */}
        <motion.section
          id="time-saved"
          className="py-16 px-4 bg-muted text-foreground"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <div className="max-w-6xl mx-auto">
            <motion.h2
              className="text-3xl font-bold mb-8 text-center"
              variants={fadeInUp}
            >
              Save Time with {process.env.NEXT_PUBLIC_APP_NAME}
            </motion.h2>
            <motion.p
              className="text-lg mb-6 text-center"
              variants={fadeInUp}
              custom={1.5}
            >
              Automating your email sequences can save you up to{" "}
              <strong>7.5 hours per month*</strong>, assuming{" "}
              <strong>50 new subscribers</strong> monthly.
            </motion.p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Manual Process */}
              <motion.div
                className="bg-card text-card-foreground flex flex-col p-6 rounded-lg shadow-md"
                variants={fadeInUp}
              >
                <h3 className="text-2xl font-semibold mb-4 text-center">
                  Manual Process
                </h3>
                <ul className="list-disc list-inside space-y-3">
                  <li>
                    Check Email for New Subscribers - <strong>2 mins</strong>
                  </li>
                  <li>
                    Extract Subscriber Information - <strong>1 min</strong>
                  </li>
                  <li>
                    Add Subscriber to Email Service - <strong>3 mins</strong>
                  </li>
                  <li>
                    Assign Email Sequence - <strong>2 mins</strong>
                  </li>
                  <li>
                    Send Welcome Email - <strong>1 min</strong>
                  </li>
                </ul>
                <p className="mt-4 text-center font-bold">
                  Total Time per Subscriber: <strong>9 mins</strong>
                </p>
              </motion.div>

              {/* Automated with Subscriber Automator */}
              <motion.div
                className="h-full bg-card text-card-foreground flex flex-col p-6 rounded-lg shadow-md"
                variants={fadeInUp}
                custom={1}
              >
                <h3 className="text-2xl font-semibold mb-4 text-center">
                  With {process.env.NEXT_PUBLIC_APP_NAME}
                </h3>
                <p className="text-lg text-center">All steps are automated!</p>
                <ul className="list-disc list-inside space-y-3 mt-4">
                  <li>
                    Manual Effort Required - <strong>0 mins</strong>
                  </li>
                </ul>
                <p className="mt-auto text-center font-bold">
                  Total Time per Subscriber: <strong>0 mins</strong>
                </p>
              </motion.div>
            </div>

            <motion.p
              className="text-lg mt-8 text-center font-bold"
              variants={fadeInUp}
              custom={2}
            >
              Total Time Saved per Month: <strong>7.5 hours*</strong>
            </motion.p>
            <p className="text-sm mt-2 text-center text-muted-foreground">
              * Calculated based on rough estimates assuming 50 new subscribers
              per month
            </p>
          </div>
        </motion.section>

        {/* Privacy Section */}
        <motion.section
          id="privacy"
          className="py-16 px-4 bg-primary/40 text-foreground"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <div className="max-w-4xl mx-auto">
            <motion.h2
              className="text-4xl md:text-5xl font-bold mb-4 text-center"
              variants={fadeInUp}
            >
              Your Privacy Is Our Priority
            </motion.h2>
            <motion.p
              className="text-base md:text-lg mb-6"
              variants={fadeInUp}
              custom={1.5}
            >
              We only access emails from Substack or Medium to retrieve your new
              subscribers&apos; names and emails. We never read any other
              emails. Your subscribers&apos; data is encrypted and securely
              stored, accessible only to you.
            </motion.p>
          </div>
        </motion.section>

        {/* Which services do we work with */}
        <motion.section
          id="services"
          className="py-16 px-4 text-foreground"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <div className="max-w-4xl mx-auto flex flex-col">
            <motion.h2
              className="text-4xl md:text-5xl font-bold mb-8 text-center"
              variants={fadeInUp}
            >
              Which services are available?
            </motion.h2>
            {/* TODO: Make Marquee for */}
            <div className="w-full flex flex-row justify-between items-center gap-6 md:gap-10 overflow-auto">
              <motion.img
                src="/logos/services/mail-chimp.png"
                alt="mail-chimp"
                className="w-30 h-20 grayscale opacity-50"
                variants={fadeInUp}
              />
              <motion.img
                src="/logos/services/constant-contact.svg"
                alt="constant-contact"
                className="w-30 h-10 grayscale opacity-50"
                variants={fadeInUp}
              />
              <motion.img
                src="/logos/services/hubspot.svg"
                alt="hubspot"
                className="w-30 h-10 grayscale opacity-50"
                variants={fadeInUp}
              />
              <motion.img
                src="/logos/services/sendinblue.png"
                alt="sendinblue"
                className="w-30 h-7 grayscale opacity-50"
                variants={fadeInUp}
              />
            </div>
            <div className="w-full flex flex-row gap-1 justify-center items-center">
              <p className="opacity-60 text-sm">
                Are you using another service?
              </p>
              <Button
                variant="link"
                className="px-0"
                onClick={() => {
                  setShowRequestService(true);
                }}
              >
                Let us know!
              </Button>
            </div>
          </div>
        </motion.section>

        {/* Call to Action Section */}
        <motion.section
          className="text-center py-20 px-4 bg-primary/40"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <motion.h2
            className="text-3xl md:text-5xl font-bold mb-6"
            variants={fadeInUp}
          >
            Start Sending Sequences Automatically Today
          </motion.h2>
          <motion.div variants={fadeInUp} custom={1.5}>
            <Button onClick={() => setShowEmailDialog(true)} size="lg">
              Keep me updated!
            </Button>
          </motion.div>
        </motion.section>
        <Dialog
          open={showEmailDialog}
          onOpenChange={open => {
            setShowEmailDialog(open);
          }}
        >
          <DialogContent closeOnOutsideClick={false}>
            <AnimatePresence mode="wait" initial={false}>
              {signUpCompleted ? (
                <motion.div
                  key="thank-you-message"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.5 }}
                >
                  <DialogHeader>
                    <DialogTitle>Thank You!</DialogTitle>
                    <DialogDescription>
                      We&apos;re thrilled to have you on board! We&apos;ll keep
                      you updated with the latest news and progress. Stay tuned!
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter className="mt-4">
                    <Button
                      onClick={() => {
                        setSignUpCompleted(false);
                        setShowEmailDialog(false);
                      }}
                    >
                      Sounds good!
                    </Button>
                  </DialogFooter>
                </motion.div>
              ) : (
                <motion.div
                  key="sign-up-form"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.5 }}
                >
                  <DialogTitle>Sign up to get updated!</DialogTitle>
                  <DialogDescription>
                    You will receive an email on the progress of SendSequence
                  </DialogDescription>
                  <form key="sign-up-form" onSubmit={formik.handleSubmit}>
                    <Input
                      key="user-email-input"
                      name="email"
                      id="user-email-input"
                      type="email"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      placeholder="What is your best email?"
                      required
                    />
                    <DialogFooter className="mt-3">
                      <Button type="submit" isLoading={loadingSignUp}>
                        Let&apos;s go!
                      </Button>
                    </DialogFooter>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </DialogContent>
        </Dialog>
        <Dialog
          open={showRequestService}
          onOpenChange={open => {
            setShowRequestService(open);
          }}
        >
          <DialogContent>
            <DialogHeader>What is your best email?</DialogHeader>
          </DialogContent>
        </Dialog>
      </main>

      <Footer />
    </>
  );
}
