import * as React from "react"
import {Helmet} from 'react-helmet'

import Page from 'layout/Page'
import Button from 'atoms/Button'

const ContactUsPage = ({location, data}) => {

  return (
    <Page location={location}>
      <Helmet>
        <title>Privacy policy - Cardboard Salad</title>
      </Helmet>
      <h1>
        Privacy policy
      </h1>
      <section>
        <h2>What is this Privacy Policy for?</h2>
        <p>This privacy policy is for the website cardboardSALAD.com and governs the privacy of its users who choose to use it.</p>
        <p>The policy sets out the different areas where user privacy is concerned and outlines the obligations & requirements of the users, the website and website owners. Furthermore the way this website processes, stores and protects user data and information will also be detailed within this policy.</p>
      </section>
      <section>
        <h2>The Website</h2>
        <p>This website and its owners take a proactive approach to user privacy and ensure the necessary steps are taken to protect the privacy of its users throughout their visiting experience.</p>
      </section>
      <section>
        <h2>Use of Cookies</h2>
        <p>This website uses cookies to better the users experience while visiting the website.</p>
        <p>Cookies are small files saved to the user’s computers hard drive that track, save and store information about the user’s interactions and usage of the website. This allows the website, through its server to provide the users with a tailored experience within this website.</p>
        <p>Users are advised that if they wish to deny the use and saving of cookies from this website on to their computers hard drive they should take necessary steps within their web browsers security settings to block all cookies from this website and its external serving vendors.</p>
        <p>This website uses tracking software to monitor its visitors to better understand how they use it. This software is provided by Google Analytics which uses cookies to track visitor usage. The software will save a cookie to your computers hard drive in order to track and monitor your engagement and usage of the website, but will not store, save or collect personal information. View and read Google’s privacy policy by following the link in the Resources section of this page.</p>
        <p>Other cookies may be stored to your computers hard drive by external vendors when this website uses referral programs, sponsored links or adverts. Such cookies are used for conversion and referral tracking and typically expire after 30 days, though some may take longer. No personal information is stored, saved or collected.</p>
      </section>
      <section>
        <h2>Contact & Communication</h2>
        <p>Users contacting this website and/or its owners do so at their own discretion and provide any such personal details requested at their own risk. Your personal information is kept private and stored securely until a time it is no longer required or has no use.</p>
      </section>
      <section>
        <h2>External Links</h2>
        <p>Although this website only looks to include quality, safe and relevant external links, users are advised adopt a policy of caution before clicking any external web links mentioned throughout this website.</p>
        <p>The owners of this website cannot guarantee or verify the contents of any externally linked website despite their best efforts. Users should therefore note they click on external links at their own risk and this website and its owners cannot be held liable for any damages or implications caused by visiting any external links mentioned.</p>
      </section>
    </Page>
  )
}

export default ContactUsPage
