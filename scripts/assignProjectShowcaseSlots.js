import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = process.env.SUPABASE_URL
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY
const EVENT_ID = 'project_showcase_community_2025'

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  throw new Error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY environment variables.')
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)

async function assignSlots() {
  const [{ data: pending, error: pendingError }, { data: freeSlots, error: slotError }] = await Promise.all([
    supabase
      .from('registrations')
      .select('id')
      .eq('event_id', EVENT_ID)
      .is('slot', null),
    supabase
      .from('event_slots')
      .select('id, slot_label')
      .eq('event_id', EVENT_ID)
      .is('assigned_registration', null),
  ])

  if (pendingError) throw pendingError
  if (slotError) throw slotError

  if (!pending?.length) {
    console.log('No pending registrations found for Project Showcase.')
    return []
  }

  if (!freeSlots?.length) {
    console.log('No available slots remain for Project Showcase.')
    return []
  }

  const shuffledSlots = [...freeSlots].sort(() => Math.random() - 0.5)
  const assignments = []

  for (let i = 0; i < pending.length && i < shuffledSlots.length; i += 1) {
    const registrationId = pending[i].id
    const slot = shuffledSlots[i]

    const { error: updateRegistrationError } = await supabase
      .from('registrations')
      .update({ slot: slot.slot_label })
      .eq('id', registrationId)

    if (updateRegistrationError) throw updateRegistrationError

    const { error: updateSlotError } = await supabase
      .from('event_slots')
      .update({ assigned_registration: registrationId })
      .eq('id', slot.id)

    if (updateSlotError) throw updateSlotError

    assignments.push({ registrationId, slot: slot.slot_label })
  }

  console.log(`Assigned ${assignments.length} slot(s).`)
  return assignments
}

if (import.meta.url === `file://${process.argv[1]}`) {
  assignSlots()
    .then((result) => {
      console.log(result)
      process.exit(0)
    })
    .catch((err) => {
      console.error(err)
      process.exit(1)
    })
}

export { assignSlots }
