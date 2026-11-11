/**
 * Interpretación profunda y específica de las energías de la naturaleza
 * para cada uno de los 64 hexagramas (basada en el Dà Xiàng • Gran Imagen).
 * Sin fórmulas repetitivas, describiendo la dinámica viva de los elementos.
 */

export interface HexagramNaturalImageData {
  elementalPhenomenon: string; // Interacción viva de las dos fuerzas naturales
  energyDynamics: string;      // Vector y comportamiento de las fuerzas
  humanConduct: string;        // Pauta de armonización humana con esa energía
}

export const HEXAGRAM_NATURAL_IMAGES: Record<number, HexagramNaturalImageData> = {
  1: {
    elementalPhenomenon: 'El movimiento incesante de la bóveda celeste. Las constelaciones y los ciclos solares giran día y noche sin fatiga, generando el tiempo y la vitalidad del cosmos.',
    energyDynamics: 'Pura energía centrífuga y propulsora: actividad luminosa continua que no admite estancamiento ni vacilación.',
    humanConduct: 'Fortalecer el propio carácter con constancia incansable, cumpliendo las responsabilidades diarias con vigor y rectitud moral insobornable.',
  },
  2: {
    elementalPhenomenon: 'La extensión infinita de la tierra que sostiene montes, acoge ríos y permite el arraigo de toda vida vegetal y animal sin discriminar ni oponer resistencia.',
    energyDynamics: 'Poder de absorción, gravedad y sustento: una receptividad fecunda que da cuerpo y densidad a lo que el cielo concibe.',
    humanConduct: 'Desarrollar una generosidad amplia y paciente, capaz de contener y acoger a los demás con afecto silencioso y servicio humilde.',
  },
  3: {
    elementalPhenomenon: 'El trueno estalla en la penumbra mientras nubes densas cargadas de agua descienden con violencia. La tormenta inicial desordena el paisaje antes de que brote la primera hierba.',
    energyDynamics: 'Tensión entre la ebullición ascendente del trueno y el peso abismal del agua: caos germinal donde la energía busca cauce.',
    humanConduct: 'No precipitarse en medio de la confusión: ordenar pacientemente las tareas, tejer redes de apoyo y dar estructura a lo caótico.',
  },
  4: {
    elementalPhenomenon: 'Un manantial de agua transparente y fresca brota en la garganta rocosa al pie de la montaña. El agua busca titubeante su curso entre piedras que aún no conoce.',
    energyDynamics: 'Flujo naciente contenido por la solidez pétrea: energía que requiere cauces firmes para no dispersarse en el fango.',
    humanConduct: 'Cultivar el propio carácter con templanza y disciplina, buscando la guía de maestros sabios y asumiendo la inexperiencia con humildad.',
  },
  5: {
    elementalPhenomenon: 'Nubes henchidas de agua y vapor flotan en lo alto del cielo diáfano. La lluvia es inminente pero aún no cae; la atmósfera aguarda el punto exacto de condensación.',
    energyDynamics: 'Suspensión equilibrada: la ligereza del cielo sostiene la humedad suspendida hasta que la madurez natural libere el rocío.',
    humanConduct: 'Alimentar el cuerpo y el espíritu con gozo sereno; esperar el momento propicio sin desgastar las energías en ansiedades prematuras.',
  },
  6: {
    elementalPhenomenon: 'El cielo se expande hacia arriba buscando las alturas infinitas, mientras que el agua desciende por gravedad hacia las profundidades más bajas.',
    energyDynamics: 'Vectores divergentes en oposición directa: las dos naturalezas se dan la espalda y cada una tira en sentido contrario sin tocarse.',
    humanConduct: 'Meditar el inicio de cada empresa y revisar los acuerdos previos; ante el primer signo de discordia, detenerse y buscar un arbitraje justo.',
  },
  7: {
    elementalPhenomenon: 'Corrientes subterráneas de agua reposan invisibles y acumuladas en las profundidades de la tierra, listas para ser canalizadas cuando sea menester.',
    energyDynamics: 'Fuerza masiva latente bajo una superficie mansa: poder colectivo que solo puede movilizarse mediante orden estricto.',
    humanConduct: 'Liderar con generosidad hacia la gente y disciplina rigurosa hacia uno mismo, organizando los recursos comunitarios con sobriedad y justicia.',
  },
  8: {
    elementalPhenomenon: 'El agua cristalina fluye cubriendo la tierra, filtrándose en sus grietas y colmando cada depresión hasta formar lagunas fértiles.',
    energyDynamics: 'Adhesión natural e íntima: la tierra sostiene el curso del agua y el agua humedece la aridez del suelo en reciprocidad absoluta.',
    humanConduct: 'Estrechar vínculos basados en la lealtad y el afecto sincero, agrupando voluntades en torno a un propósito noble y compartido.',
  },
  9: {
    elementalPhenomenon: 'El viento sopla en las alturas de la bóveda celeste arrastrando nubes sutiles que velan el sol, pero la masa nubosa aún es tenue para descargar lluvia.',
    energyDynamics: 'Fricción aérea sobre una superficie inmensa: fuerza sutil que modifica el clima gradualmente sin despliegue de violencia.',
    humanConduct: 'Refinar las formas exteriores, cuidar los detalles cotidianos y persuadir mediante la cortesía y la perseverancia discreta.',
  },
  10: {
    elementalPhenomenon: 'El cielo luminoso y firme se extiende por encima de las aguas serenas de un lago risueño. La altura majestuosa convive con la profundidad sonriente.',
    energyDynamics: 'Diferenciación jerárquica clara: lo supremo se mantiene arriba y lo grácil abajo, evitando invasiones territoriales.',
    humanConduct: 'Discernir las jerarquías de las cosas y la dignidad de cada posición, conduciéndose con tacto y respeto reverente ante lo sagrado y lo ajeno.',
  },
  11: {
    elementalPhenomenon: 'La tierra fértil se halla arriba descendiendo en bendiciones, mientras el cielo cálido se sitúa en la base ascendiendo con su luz.',
    energyDynamics: 'Convergencia fecunda total: las fuerzas opuestas se mueven una hacia la otra, abrazándose y fecundando toda la creación.',
    humanConduct: 'Distribuir con generosidad los frutos del bienestar, apoyar los esfuerzos colectivos y consolidar las relaciones antes de que el ciclo mude.',
  },
  12: {
    elementalPhenomenon: 'El cielo asciende cada vez más lejos hacia la estratosfera y la tierra densa se hunde hacia el fondo; entre ambos media un vacío frío e incomunicado.',
    energyDynamics: 'Dispersión y distanciamiento terminal: no hay intercambio térmico ni fecundación; reina el invierno y la parálisis.',
    humanConduct: 'Resguardar la integridad ética en el silencio interior, declinar honores dudosos y no desgastarse intentando dialogar con la necedad.',
  },
  13: {
    elementalPhenomenon: 'El fuego asciende en llamaradas brillantes buscando reunirse con el calor y la luz del cielo abierto; la lumbre ilumina la noche en descampado.',
    energyDynamics: 'Afinidad luminosa: dos naturalezas cálidas y transparentes que se reconocen y armonizan por encima de las distancias.',
    humanConduct: 'Trascender las barreras familiares o de grupo para congregar a los seres humanos en ideales de cooperación universal y justicia.',
  },
  14: {
    elementalPhenomenon: 'El sol del mediodía brilla en la cúspide del firmamento, iluminando sin sombras todos los rincones de la tierra bajo su calor benefactor.',
    energyDynamics: 'Plenitud radiante y visibilidad total: la luz del fuego ilumina el poder firme del cielo, otorgando claridad absoluta.',
    humanConduct: 'Refrenar con benevolencia lo que perjudica, promover con entusiasmo lo que edifica y administrar las bendiciones con profunda gratitud.',
  },
  15: {
    elementalPhenomenon: 'Una montaña de roca maciza se oculta en el seno de la tierra llana, disimulando sus cumbres dentro del suelo que todos pisan.',
    energyDynamics: 'Grandeza contenida bajo una apariencia llana: la masa pétrea renuncia a la altivez y se somete al nivel general del suelo.',
    humanConduct: 'Reducir lo que está en exceso, compensar lo que es escaso y medir las propias virtudes sin jamás hacer alarde de los méritos logrados.',
  },
  16: {
    elementalPhenomenon: 'El trueno estalla resonando sobre la llanura terrenal; la vibración estremece el suelo y despierta la savia de las plantas dormidas con la llegada del estío.',
    energyDynamics: 'Onda expansiva que rompe la inercia: la elasticidad de la tierra responde al pulso rítmico del trueno con danzas y brotes.',
    humanConduct: 'Inspirar a la comunidad mediante la música, el arte y la celebración compartida, alineando el entusiasmo con las leyes naturales del tiempo.',
  },
  17: {
    elementalPhenomenon: 'El trueno descansa en las profundidades de un lago en calma durante el otoño; la fuerza del rayo se repliega plácidamente bajo el agua quieta.',
    energyDynamics: 'Sumisión voluntaria de la fuerza motriz ante el sosiego: el ímpetu se pliega a los ritmos de reposo sin perder su vitalidad.',
    humanConduct: 'Saber retirarse a descansar al caer la noche y adaptarse dócilmente a las circunstancias presentes sin imponer caprichos personales.',
  },
  18: {
    elementalPhenomenon: 'El viento sopla estancado al pie de una montaña impenetrable; al no poder circular libremente, el aire envejece y engendra hongos y descomposición.',
    energyDynamics: 'Aire viciado por falta de ventilación: la rigidez exterior atrapa la corriente suave, demandando una purga urgente.',
    humanConduct: 'Despertar la conciencia colectiva, reparar con rigor las fallas heredadas del pasado y renovar las costumbres antes de que la ruina sea total.',
  },
  19: {
    elementalPhenomenon: 'La tierra húmeda y nutricia bordea un lago rebosante de agua dulce, ofreciendo suelo fértil a los juncos y alimento a las riberas.',
    energyDynamics: 'Aproximación suave y enriquecedora: el agua y la tierra se abrazan en las orillas propiciando una germinación continua.',
    humanConduct: 'Enseñar e instruir con paciencia infinita a quienes buscan crecer, acogiendo y protegiendo a la comunidad con tolerancia maternal.',
  },
  20: {
    elementalPhenomenon: 'El viento recorre la vasta superficie de la tierra, acariciando montes, llanos y sembrados sin detenerse en ningún rincón exclusivo.',
    energyDynamics: 'Circulación omnidireccional y observación panorámica: nada escapa al aliento del viento que sondea la totalidad del territorio.',
    humanConduct: 'Contemplar con serenidad los ciclos de la vida y el corazón de las personas, transformando el entorno mediante el ejemplo ético inmaculado.',
  },
  21: {
    elementalPhenomenon: 'El relámpago ilumina el cielo en un fogonazo simultáneo al estruendo desgarrador del trueno; la atmósfera se desgarra con precisión instantánea.',
    energyDynamics: 'Descarga eléctrica concentrada: la luz esclarece el objeto y el choque sonoro pulveriza cualquier obstáculo en una fracción de segundo.',
    humanConduct: 'Hacer inteligibles las leyes y aplicar la justicia con ecuanimidad y firmeza, eliminando las trampas que enturbian la convivencia.',
  },
  22: {
    elementalPhenomenon: 'El fuego arde en la base de la montaña, iluminando sus riscos con destellos dorados que embellecen el paisaje nocturno.',
    energyDynamics: 'Resplandor estético sobre la piedra: la luz viste las formas sólidas de la roca sin alterar su estructura esencial.',
    humanConduct: 'Aclarar los asuntos públicos mediante la elegancia de las formas y la cultura, reservando la sobriedad tajante para los grandes litigios.',
  },
  23: {
    elementalPhenomenon: 'La montaña elevada descansa sobre una capa de tierra blanda que cede y se erosiona bajo los embates continuos de la lluvia y el viento.',
    energyDynamics: 'Socavamiento progresivo de la base: la masa pesada de arriba pierde sustento y se desploma irremediablemente.',
    humanConduct: 'Asegurar la propia posición beneficiando a los más humildes, pues solo una base sólida y satisfecha puede sostener a los que están arriba.',
  },
  24: {
    elementalPhenomenon: 'El trueno descansa en las entrañas de la tierra en el solsticio invernal; una chispa de calor activo renace en lo más profundo de la helada.',
    energyDynamics: 'Inflexión cíclica suave: la luz comienza a retornar desde el fondo sin forzar el paso, iniciando el despertar del nuevo año.',
    humanConduct: 'Cerrar las puertas al comercio y al ajetreo en los momentos de transición; reposar para permitir que la energía vital renazca espontáneamente.',
  },
  25: {
    elementalPhenomenon: 'Bajo el cielo inmenso retumba el trueno en primavera; la naturaleza despierta con inocencia pura y las plantas crecen sin cálculo ni vanidad.',
    energyDynamics: 'Espontaneidad sagrada: la energía activa del cielo impulsa el movimiento natural de las cosas libres de artificio mental.',
    humanConduct: 'Obrar con sinceridad cristalina y honradez espontánea, cuidando de no forzar los destinos con maquinaciones o ambiciones egoístas.',
  },
  26: {
    elementalPhenomenon: 'La montaña inmóvil alberga en sus entrañas la luz y la inmensidad del cielo; la roca contiene dentro de sí la fuerza colosal del firmamento.',
    energyDynamics: 'Acumulación masiva de energía en reposo: una potencia cósmica aprisionada y madurada dentro de una muralla pétrea.',
    humanConduct: 'Aprender de las enseñanzas y hechos ejemplares de la antigüedad para nutrir y robustecer el propio carácter moral día a día.',
  },
  27: {
    elementalPhenomenon: 'La montaña quieta arriba forma el maxilar superior inmóvil, y el trueno agitándose abajo emula el maxilar inferior en movimiento: la imagen de la boca que se nutre.',
    energyDynamics: 'Péndulo de masticación y asimilación: la quietud sostiene la base mientras la movilidad tritura el alimento para la vida.',
    humanConduct: 'Vigilar estrictamente las palabras que salen de la propia boca y cuidar la calidad de los alimentos y pensamientos que se dejan entrar.',
  },
  28: {
    elementalPhenomenon: 'El agua de un lago desbordado inunda un bosque sumergiendo las copas de los árboles; la viga del tejado se comba bajo una masa excesiva.',
    energyDynamics: 'Sobrecarga crítica en el límite de ruptura: el peso del elemento superior aplasta los soportes normales de sustentación.',
    humanConduct: 'Mantenerse sereno e imperturbable cuando se deba afrontar la soledad, renunciando al mundo sin zozobra si la ética lo exige.',
  },
  29: {
    elementalPhenomenon: 'El agua fluye incesantemente a través de gargantas abismales; cae de cascada en cascada sin detenerse ni retroceder ante ningún precipicio.',
    energyDynamics: 'Corriente continua e invencible: el agua llena cada pozo hasta el borde antes de seguir su camino, fiel a su naturaleza húmeda.',
    humanConduct: 'Mantener una virtud constante e inalterable, enseñando a través del ejemplo perseverante en medio de las pruebas más difíciles.',
  },
  30: {
    elementalPhenomenon: 'Llamas gemelas se suceden y se expanden alimentadas por una misma leña; la claridad del fuego alumbra y disipa cualquier oscuridad a su paso.',
    energyDynamics: 'Adhesión luminosa continua: la energía radiante solo existe mientras se aferra al combustible nutricia que la sostiene.',
    humanConduct: 'Reconocer los principios nobles a los que conviene adherirse, cultivando una lucidez constante que ilumine a las cuatro direcciones.',
  },
  31: {
    elementalPhenomenon: 'Un lago de aguas mansas reposa en la cima de una montaña rocosa; el agua penetra por las fisuras de la piedra nutriendo la cumbre.',
    energyDynamics: 'Resonancia sutil y atracción espontánea: la quietud de la montaña acoge la alegría del agua en una comunión que no precisa esfuerzo.',
    humanConduct: 'Mantener el corazón vacío de prejuicios y egoísmos para estar en condiciones de recibir con simpatía y comprensión el influjo ajeno.',
  },
  32: {
    elementalPhenomenon: 'El trueno retumba y el viento sopla en comunión constante; ambos fenómenos se acompañan en cada tormenta sin estorbarse jamás.',
    energyDynamics: 'Movimiento cíclico regular: las fuerzas atmosféricas varían continuamente pero su ley de alternancia permanece idéntica a sí misma.',
    humanConduct: 'Permanecer firme en los propios principios éticos a lo largo del tiempo, adaptándose a las circunstancias sin cambiar jamás de rumbo interior.',
  },
  33: {
    elementalPhenomenon: 'Bajo la bóveda celeste se alza la montaña; por alta que sea la cumbre, el cielo se retira hacia las alturas inaccesibles sin confrontación.',
    energyDynamics: 'Distanciamiento digno y altivo: lo sublime se aparta de lo terrenal con elegancia, sin amargura ni rencor.',
    humanConduct: 'Mantener a distancia a las personas mezquinas no con agresividad o desprecio, sino mediante una dignidad reservada e inexpugnable.',
  },
  34: {
    elementalPhenomenon: 'El trueno estalla con toda su potencia en lo alto del cielo abierto; la descarga retumba en el firmamento sin que nada pueda frenar su eco.',
    energyDynamics: 'Fuerza expansiva en su máxima cota: un poder impetuoso que corre el riesgo de desbordarse si no respeta los límites del orden.',
    humanConduct: 'No dar ningún paso que no concuerde estrictamente con las normas morales del respeto y la justicia, evitando el atropello de la fuerza bruta.',
  },
  35: {
    elementalPhenomenon: 'El sol se eleva por encima del horizonte sobre la tierra abierta; sus rayos disipan la bruma matinal y calientan los campos de cultivo.',
    energyDynamics: 'Ascenso radiante y diáfano: la luz emerge desde el plano terrenal y se derrama con generosidad sobre la totalidad del paisaje.',
    humanConduct: 'Hacer brillar los propios talentos y virtudes morales, poniéndolos con transparencia al servicio generoso del bienestar de la comunidad.',
  },
  36: {
    elementalPhenomenon: 'El sol brillante se oculta bajo la superficie de la tierra; la noche cubre el mundo y la oscuridad envuelve los caminos.',
    energyDynamics: 'Ocultamiento protector de la luz: el fuego interior se sumerge en la densidad telúrica para no ser extinguido por la hostilidad del entorno.',
    humanConduct: 'Vivir en medio de la multitud ocultando el propio brillo y sabiduría; ser accesible en el trato exterior conservando la lucidez en lo íntimo.',
  },
  37: {
    elementalPhenomenon: 'El viento sopla atizando el fuego en el hogar; las llamas calientan la casa y la corriente de aire expande el calor hacia todas las habitaciones.',
    energyDynamics: 'Foco interno que se propaga con coherencia: el calor nace del centro doméstico y su influencia bienhechora se extiende hacia afuera.',
    humanConduct: 'Asegurar que las palabras tengan siempre fundamento real en los hechos y que la propia conducta cotidiana sea consecuente y duradera.',
  },
  38: {
    elementalPhenomenon: 'Arriba arde el fuego elevando sus llamaradas al cielo, mientras abajo el agua del lago busca el fondo; las naturalezas de ambos elementos se rechazan.',
    energyDynamics: 'Divergencia elemental inevitable: el fuego no humedece y el agua no quema; sus movimientos se oponen sin posibilidad de fusión directa.',
    humanConduct: 'Saber conservar la propia individualidad y criterio ético en medio de comunidades diversas, comprendiendo las diferencias sin combatirlas.',
  },
  39: {
    elementalPhenomenon: 'Un torrente de aguas peligrosas e impetuosas se precipita justo frente a una montaña escarpada e inaccesible que corta el paso.',
    energyDynamics: 'Doble encrucijada insuperable: el abismo delante y la muralla rocosa detrás; la energía queda detenida por pura prudencia.',
    humanConduct: 'Volver la mirada hacia el propio interior en busca de los propios defectos para corregirlos, en lugar de quejarse de las barreras del camino.',
  },
  40: {
    elementalPhenomenon: 'El trueno estalla entre nubarrones de lluvia disolviendo el bochorno opresivo; la tormenta descarga su agua y el aire recobra su pureza y ligereza.',
    energyDynamics: 'Distensión explosiva y alivio restaurador: el rayo rompe la presión atmosférica acumulada y la naturaleza respira aliviada.',
    humanConduct: 'Perdonar las faltas ajenas con nobleza y olvidar los agravios pasados, actuando con prontitud para cerrar los asuntos pendientes.',
  },
  41: {
    elementalPhenomenon: 'Al pie de la montaña descansa un lago cuyas aguas se evaporan para humedecer las laderas rocosas y nutrir los bosques de la cumbre.',
    energyDynamics: 'Transferencia generosa de abajo hacia arriba: el plano inferior cede voluntariamente su caudal para enriquecer la cima.',
    humanConduct: 'Refrenar la ira impulsiva y moderar los apetitos y deseos egoístas, encontrando en la sobriedad y la renuncia una auténtica fortaleza interior.',
  },
  42: {
    elementalPhenomenon: 'El viento sopla con fuerza y el trueno redobla su estruendo; cada ráfaga aviva la potencia de la tormenta en un incremento mutuo de energía.',
    energyDynamics: 'Alimentación sinérgica recíproca: el dinamismo aéreo acelera la vibración eléctrica, expandiendo la vitalidad de la naturaleza.',
    humanConduct: 'Al advertir el bien y la excelencia en otros, imitarlo de inmediato; al reconocer defectos o faltas en uno mismo, extirparlos sin vacilación.',
  },
  43: {
    elementalPhenomenon: 'El vapor del lago ha ascendido hasta saturar la bóveda del cielo; la inmensa masa de agua suspendida está a punto de romper las nubes en tromba.',
    energyDynamics: 'Tensión de ruptura en el punto más alto: la fuerza acumulada no puede sostenerse más tiempo y debe precipitarse con resolución.',
    humanConduct: 'Distribuir los bienes acumulados hacia abajo y abstenerse de descansar en la soberbia o en el orgullo por los méritos conseguidos.',
  },
  44: {
    elementalPhenomenon: 'El viento sopla libre y fresco por debajo de la bóveda celeste, extendiéndose a todos los rincones de la tierra y tocando cuanto encuentra.',
    energyDynamics: 'Penetración aérea sutil y envolvente: un elemento móvil e insinuante que se cuela bajo la majestad de lo firme sin anunciarse.',
    humanConduct: 'Proclamar los principios y directrices con claridad diáfana a los cuatro confines del mundo, previniendo infiltraciones nocivas.',
  },
  45: {
    elementalPhenomenon: 'El agua de las lluvias converge y se congrega sobre la hondonada de la tierra, formando un lago extenso donde se reúnen todas las criaturas.',
    energyDynamics: 'Agrupamiento centrípeto natural: los caudales dispersos buscan el punto más bajo para unificarse en una masa colectiva.',
    humanConduct: 'Renovar las armas morales y prevenir los desórdenes imprevistos, consolidando las leyes y la confianza para resguardar la armonía común.',
  },
  46: {
    elementalPhenomenon: 'En el seno de la tierra húmeda una semilla echa raíces hacia abajo y despliega su tronco vertical hacia la luz del sol con crecimiento continuo.',
    energyDynamics: 'Ascenso constante y silencioso: la fuerza vital de la madera se abre paso suavemente a través de la densidad terrenal sin violencia.',
    humanConduct: 'Acumular pequeñas virtudes y esfuerzos cotidianos con devoción inquebrantable para construir una obra alta y noble paso a paso.',
  },
  47: {
    elementalPhenomenon: 'El agua que debería alimentar el lago se ha escurrido por las fisuras subterráneas hacia el abismo; el lecho del lago queda seco y agrietado.',
    energyDynamics: 'Agotamiento por fuga del elemento vital: el cauce superior se vacía mientras la corriente fluye oculta e inaccesible.',
    humanConduct: 'Mantener la alegría y la serenidad espiritual aun cuando falten los recursos materiales, consagrando la propia vida a la coherencia ética.',
  },
  48: {
    elementalPhenomenon: 'El agua subterránea reposa en el fondo del pozo, y un cubo de madera suspendido por cuerdas desciende y sube extrayendo el agua viva para la aldea.',
    energyDynamics: 'Manantial inagotable que asciende por la madera: la fuente permanece fija y eterna, pero su fruto depende de la integridad del cántaro.',
    humanConduct: 'Alentar a las personas mediante la instrucción constante y fomentar la cooperación mutua para que el sustento llegue a todos sin excepción.',
  },
  49: {
    elementalPhenomenon: 'En el seno del lago arde un fuego volcánico; el calor evapora las aguas y el agua sofoca las llamas en una lucha donde todo se transmuta.',
    energyDynamics: 'Metamorfosis radical de dos contrarios: las fuerzas se transforman mutuamente hasta dar paso a un nuevo estado de la materia.',
    humanConduct: 'Ordenar el calendario de las cosas y hacer inteligibles las estaciones y los ciclos del tiempo, renovando lo caduco con justicia estricta.',
  },
  50: {
    elementalPhenomenon: 'La madera nutre las llamas que arden bajo el caldero de bronce; el fuego cuece los alimentos y los transforma en ofrenda sagrada y banquete.',
    energyDynamics: 'Alquimia y refinamiento espiritual: el calor dócil y constante sublima la materia elemental en un alimento sutil y nutritivo.',
    humanConduct: 'Afianzar la propia posición interior mediante la rectitud moral, armonizando el destino propio con los designios más puros del cielo.',
  },
  51: {
    elementalPhenomenon: 'El trueno redoblado estalla dos veces consecutivas sacudiendo el horizonte; la onda expansiva despierta a todos los seres con temor reverente.',
    energyDynamics: 'Conmoción sísmica repetida: la electricidad descarga su tensión y resuena en ecos que purifican la atmósfera cargada.',
    humanConduct: 'Examinar el propio corazón con respeto reverente ante el cosmos, rectificando de inmediato cualquier extravío en la propia conducta.',
  },
  52: {
    elementalPhenomenon: 'Dos montañas de roca sólida se alzan una junto a la otra; sus cumbres reposan inmóviles deteniendo el viento y el avance de los caminos.',
    energyDynamics: 'Quietud absoluta y fijación infranqueable: masa pétrea que descansa en su propia base sin inclinarse ni moverse un milímetro.',
    humanConduct: 'No permitir que los pensamientos divaguen más allá de la situación presente; aquietar los deseos del ego y reposar en el aquí y el ahora.',
  },
  53: {
    elementalPhenomenon: 'Sobre el risco de una alta montaña crece un pino majestuoso; el árbol hunde sus raíces milimétricamente en la roca antes de ganar altura.',
    energyDynamics: 'Evolución pausada y firme: la lentitud del arraigo garantiza que el árbol resista los vendavales más feroces de la cumbre.',
    humanConduct: 'Apoyarse en la dignidad moral y el respeto a cada etapa del proceso, mejorando las costumbres y los lazos con paciencia infinita.',
  },
  54: {
    elementalPhenomenon: 'El trueno se agita e impacta sobre las aguas mansas del lago; el estruendo conmociona la superficie líquida en un desposorio tempestuoso.',
    energyDynamics: 'Atracción apasionada y precipitada: el movimiento del trueno seduce al lago rompiendo las formas ordenadas del protocolo.',
    humanConduct: 'Comprender la fugacidad y las imperfecciones de los asuntos humanos, anticipando las consecuencias de las pasiones desmedidas para no errar.',
  },
  55: {
    elementalPhenomenon: 'El trueno ruge y el relámpago zigzaguea con máxima intensidad en el mediodía de una tormenta estival colosal; la luz y la fuerza son plenas.',
    energyDynamics: 'Cenit energético descomunal: luminosidad deslumbrante acompañada por el choque sonoro en el punto máximo de abundancia.',
    humanConduct: 'Resolver los litigios pendientes con equidad y aplicar las leyes con discernimiento lúcido mientras la energía de abundancia esté presente.',
  },
  56: {
    elementalPhenomenon: 'Un fuego de pastos arde en la ladera de la montaña; las llamas devoran la maleza y avanzan con rapidez sin echar raíces en el terreno.',
    energyDynamics: 'Tránsito veloz y efímero: el fuego ilumina fugazmente la roca y sigue su marcha errante sin afianzarse en un hogar fijo.',
    humanConduct: 'Proceder con extrema cautela y cortesía al estar de viaje o en tierra extraña, dictando sanciones leves y no dilatando los conflictos.',
  },
  57: {
    elementalPhenomenon: 'Brizas suaves de viento se suceden unas a otras soplando en la misma dirección; el aire se insinúa a través de cada rendija sin forzar la entrada.',
    energyDynamics: 'Penetración suave e inexorable: la persistencia dócil de la corriente vence la resistencia más dura por pura constancia temporal.',
    humanConduct: 'Difundir las orientaciones y principios con paciencia reiterada, ejecutando las decisiones con amabilidad y firmeza perseverante.',
  },
  58: {
    elementalPhenomenon: 'Dos lagos de aguas cristalinas se hallan conectados entre sí; las aguas de uno alimentan al otro impidiendo que ninguno se seque jamás.',
    energyDynamics: 'Comunión risueña y recarga continua: el nivel se equilibra por vasos comunicantes en un intercambio armónico y sin desgaste.',
    humanConduct: 'Reunirse con amigos afines para dialogar, contrastar pareceres y cultivar la sabiduría mediante la conversación franca y cordial.',
  },
  59: {
    elementalPhenomenon: 'El viento primaveral sopla cálidamente sobre el agua helada de los ríos; el hielo rígido se agrieta, se derrite y vuelve a fluir en libertad.',
    energyDynamics: 'Disolución de la rigidez: el calor del aire ablanda las barreras duras permitiendo que las aguas estancadas se reintegren al mar.',
    humanConduct: 'Celebrar los ritos sagrados y congregar a la comunidad para disolver los rencores y las divisiones egoístas que aíslan a las personas.',
  },
  60: {
    elementalPhenomenon: 'El agua caudalosa fluye contenida dentro de las riberas firmes de un lago; los diques encauzan el volumen impidiendo la inundación desoladora.',
    energyDynamics: 'Delimitación salutífera del flujo: las orillas imponen una frontera necesaria para que el agua no se disperse en un pantano estéril.',
    humanConduct: 'Establecer límites claros en el gasto, en el tiempo y en las ambiciones, diseñando normas sobrias que sean sostenibles con alegría.',
  },
  61: {
    elementalPhenomenon: 'El viento sopla sobre las aguas transparentes de un lago apacible; la superficie pulida refleja el cielo y se ondula dócil a la brisa.',
    energyDynamics: 'Transparencia y resonancia profunda: el aire penetra el agua sin resistencia porque ambas sustancias son puras y receptivas.',
    humanConduct: 'Examinar los casos y las motivaciones humanas con imparcialidad benevolente y sinceridad absoluta, evitando juzgar con ligereza.',
  },
  62: {
    elementalPhenomenon: 'El trueno resuena amortiguado en lo profundo de la montaña; la masa inmensa de la roca silencia el estrépito y reduce el choque a un temblor menor.',
    energyDynamics: 'Freno contundente a la expansión: la altura mineral absorbe la onda expansiva obligando a las fuerzas a moverse con extrema pequeñez.',
    humanConduct: 'En la conducta personal ser más humilde y comedido; en el duelo más conmovido; en la administración de recursos más frugal y austero.',
  },
  63: {
    elementalPhenomenon: 'El agua se halla sobre el fuego dentro de un caldero; el calor calienta el agua y el agua contiene el fuego en una cocción perfecta.',
    energyDynamics: 'Equilibrio exacto y precario: cada elemento ocupa su lugar idóneo, pero cualquier desbalance hará que el agua apague el fuego o el fuego consuma el agua.',
    humanConduct: 'Meditar sobre las posibles desgracias antes de que ocurran y tomar precauciones rigurosas para preservar el orden alcanzado.',
  },
  64: {
    elementalPhenomenon: 'El fuego arde en lo alto y el agua fluye abajo sin tocarse; el calor no llega al agua y el agua no mitiga el fuego, dejando la obra inconclusa.',
    energyDynamics: 'Separación antes de la unión fecunda: los elementos están listos pero aún no interactúan, demandando un último esfuerzo de articulación.',
    humanConduct: 'Discernir con extrema cautela la naturaleza de las cosas y la posición adecuada de cada elemento antes de dar el paso culminante.',
  },
};
