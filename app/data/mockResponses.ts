// Respuestas simuladas predefinidas para el chat
export const mockResponses = {
  short: [
    "Entendido.",
    "Claro, ¿en qué más puedo ayudarte?",
    "Perfecto.",
    "De acuerdo.",
    "Sí, por supuesto.",
    "No hay problema.",
    "Correcto.",
    "Está bien.",
  ],
  medium: [
    "Entiendo tu consulta. Déjame ayudarte con eso. ¿Hay algo específico que necesites?",
    "Gracias por tu pregunta. Puedo ayudarte con esa información. ¿Quieres que profundice en algún aspecto?",
    "Comprendo lo que necesitas. Te puedo proporcionar más detalles si lo requieres.",
    "Perfecto, entiendo tu solicitud. ¿Hay algo más en lo que pueda asistirte?",
    "Claro, puedo ayudarte con eso. Si necesitas más información, solo pregunta.",
    "De acuerdo, entiendo lo que buscas. ¿Quieres que te explique algo más?",
  ],
  long: [
    "Entiendo completamente tu consulta. Permíteme explicarte en detalle: esto es un tema importante que requiere atención cuidadosa. Te puedo proporcionar información completa y detallada sobre el asunto. Si necesitas profundizar en algún aspecto específico, estaré encantado de ayudarte con más detalles y ejemplos prácticos.",
    "Gracias por tu pregunta. Es un tema interesante que merece una explicación completa. Déjame darte una respuesta detallada que cubra todos los aspectos relevantes. Esto incluye consideraciones importantes, mejores prácticas y recomendaciones basadas en la experiencia. Si después de esta explicación necesitas más información sobre algún punto específico, no dudes en preguntar.",
    "Comprendo perfectamente lo que necesitas. Esta es una consulta que requiere una respuesta exhaustiva. Te voy a proporcionar una explicación completa que aborde todos los aspectos relevantes del tema, incluyendo contexto, detalles técnicos y recomendaciones prácticas. Espero que esta información sea útil para tus necesidades.",
  ],
};

// Función para obtener una respuesta aleatoria según la longitud
export const getRandomResponse = (type: 'short' | 'medium' | 'long'): string => {
  const responses = mockResponses[type];
  return responses[Math.floor(Math.random() * responses.length)];
};

// Función para determinar el tipo de respuesta basado en porcentajes
export const getResponseType = (short: number, medium: number, long: number): 'short' | 'medium' | 'long' => {
  const random = Math.random() * 100;
  
  if (random < short) return 'short';
  if (random < short + medium) return 'medium';
  return 'long';
};

