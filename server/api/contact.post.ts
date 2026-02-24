import nodemailer from 'nodemailer'

type ContactPayload = {
  name: string
  email: string
  subject: string
  message: string
}

const isNonEmptyString = (value: unknown) => typeof value === 'string' && value.trim().length > 0

export default defineEventHandler(async (event) => {
  const body = (await readBody(event)) as Partial<ContactPayload>

  if (!isNonEmptyString(body.name) || body.name.length > 120) {
    throw createError({ statusCode: 400, statusMessage: 'Nom invalide.' })
  }
  if (!isNonEmptyString(body.email) || body.email.length > 180) {
    throw createError({ statusCode: 400, statusMessage: 'Email invalide.' })
  }
  if (!isNonEmptyString(body.subject) || body.subject.length > 160) {
    throw createError({ statusCode: 400, statusMessage: 'Sujet invalide.' })
  }
  if (!isNonEmptyString(body.message) || body.message.length > 6000) {
    throw createError({ statusCode: 400, statusMessage: 'Message invalide.' })
  }

  const config = useRuntimeConfig()
  const smtp = config.smtp as {
    host?: string
    port?: number
    user?: string
    pass?: string
  }

  const siteName = String(config.public.siteName || 'GodFatherGame')
  const adminEmail = String(config.public.contactEmail || '')
  const from = String(config.public.smtpFrom || smtp.user || adminEmail || '')

  if (!smtp.host || !smtp.port || !smtp.user || !smtp.pass || !adminEmail || !from) {
    throw createError({ statusCode: 500, statusMessage: 'Configuration email manquante.' })
  }

  const transporter = nodemailer.createTransport({
    host: smtp.host,
    port: smtp.port,
    secure: smtp.port === 465,
    auth: { user: smtp.user, pass: smtp.pass }
  })

  const adminSubject = `[${siteName}] ${body.subject.trim()}`
  const adminText = [
    `Nouvelle demande depuis ${siteName}`,
    '',
    `Nom : ${body.name.trim()}`,
    `Email : ${body.email.trim()}`,
    `Sujet : ${body.subject.trim()}`,
    '',
    body.message.trim()
  ].join('\n')

  await transporter.sendMail({
    from,
    to: adminEmail,
    replyTo: body.email.trim(),
    subject: adminSubject,
    text: adminText
  })

  const clientSubject = `Accusé de réception — ${siteName}`
  const clientText = [
    `Bonjour ${body.name.trim()},`,
    '',
    `Nous avons bien reçu votre message et nous revenons vers vous rapidement.`,
    '',
    `Récapitulatif :`,
    `Sujet : ${body.subject.trim()}`,
    '',
    body.message.trim(),
    '',
    `Merci,`,
    siteName
  ].join('\n')

  await transporter.sendMail({
    from,
    to: body.email.trim(),
    subject: clientSubject,
    text: clientText
  })

  return { ok: true }
})
