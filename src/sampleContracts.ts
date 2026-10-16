export interface SampleContract {
  id: string;
  title: string;
  category: string;
  description: string;
  text: string;
}

export const SAMPLE_CONTRACTS: SampleContract[] = [
  {
    id: 'chile-las-condes-standard',
    title: 'Contrato Residencial Las Condes (Estándar con Corretaje)',
    category: 'Residencial Urbano',
    description: 'Arriendo de departamento en Las Condes con comisión de corretaje del 10% mensual, reajuste semestral por IPC y 1 mes de garantía.',
    text: `CONTRATO DE ARRENDAMIENTO DE INMUEBLE URBANO

En Santiago de Chile, a 15 de marzo de 2026, entre:

1. ARRENDADOR: Don ROBERTO SILVA MORALES, Cédula de Identidad N° 13.482.910-K, domiciliado en Av. Apoquindo 4501, comuna de Las Condes, Santiago.
   Billetera Avalanche C-Chain autorizada: 0x4838B106FCe9647Bdf1E7877BF73cE8B0BAD5f97
   Correo electrónico: rsilva.morales@propiedades.cl

2. ARRENDATARIO: Doña CAMILA ANDREA VALENZUELA SOTO, Cédula de Identidad N° 18.944.321-4, domiciliada en calle El Golf 220, comuna de Las Condes, Santiago.
   Billetera Avalanche C-Chain autorizada: 0x71C7656EC7ab88b098defB751B7401B5f6d8976F
   Correo electrónico: cvalenzuela@techmail.com

3. CORREDORA DE PROPIEDADES: ANDES REALTY CAPITAL & CORRETAJES S.A., RUT N° 76.892.411-9, representada por don GONZALO PRIETO UNDURRAGA, C.I. 15.301.884-2, con domicilio en Isidora Goyenechea 3000, oficina 1402, Las Condes.
   Billetera Avalanche C-Chain autorizada: 0xBcd4042DE499D14e55001CcbB24a551F3b954096
   Correo electrónico: operaciones@andesrealty.cl

Se ha convenido el siguiente contrato de arrendamiento regido por la Ley N° 18.101 de Arrendamiento de Predios Urbanos y sus modificaciones introducidas por la Ley N° 21.461:

PRIMERO - OBJETO: El Arrendador da en arrendamiento al Arrendatario el inmueble ubicado en Av. Presidente Riesco 5335, Departamento 1104 y Estacionamiento N° 45, comuna de Las Condes.

SEGUNDO - PLAZO: El presente contrato comenzará a regir el 1 de abril de 2026 y tendrá una duración forzosa de 12 meses, prorrogable tácita y sucesivamente por periodos iguales.

TERCERO - RENTA Y DIVISIÓN MENSUAL: La renta mensual pactada es la suma equivalente a 1.200 USDC (mil doscientos dólares digitales USD Coin en la red Avalanche C-Chain).
Las partes acuerdan expresamente canalizar el pago mediante el Smart Contract de RentTrust-AI, distribuyendo el pago de la siguiente manera:
a) El 90% del canon mensual (1.080 USDC) se liquidará en favor del Arrendador.
b) El 10% del canon mensual (120 USDC) corresponde a los honorarios y comisión de administración inmobiliaria de la Corredora Andes Realty Capital.
El pago deberá realizarse dentro de los primeros 5 días corridos de cada mes calendario.

CUARTO - REAJUSTABILIDAD (IPC): La renta se reajustará semestralmente conforme a la variación acumulada del Índice de Precios al Consumidor (IPC) determinado por el Instituto Nacional de Estadísticas (INE), manteniéndose la paridad equivalente en USDC.

QUINTO - DEPÓSITO EN GARANTÍA: Para garantizar la conservación del inmueble y el fiel cumplimiento del contrato, el Arrendatario entrega en este acto la suma de 1.200 USDC (equivalente a un mes de renta). Dicho monto quedará en custodia en el contrato inteligente y será restituido dentro del plazo máximo de 30 días corridos contados desde la restitución material de la propiedad, previa deducción de cuentas impagas o deterioros debidamente acreditados.

SEXTO - MULTA Y TÉRMINO ANTICIPADO: Si el Arrendatario decide poner término anticipado al contrato antes del vencimiento del plazo forzoso de 12 meses, deberá notificar con a lo menos 60 días de anticipación y pagar una indemnización compensatoria equivalente a 1 mes de renta en USDC.

SÉPTIMO - LEY APLICABLE Y JURISDICCIÓN: Para todos los efectos legales, las partes se someten a los Tribunales Ordinarios de Justicia de Santiago y a las normas de la Ley 18.101.`,
  },
  {
    id: 'chile-providencia-uf',
    title: 'Contrato Providencia (Reajuste UF y Comisión 8%)',
    category: 'Residencial',
    description: 'Contrato con renta indexada en Unidades de Fomento (UF) liquidable en USDC, comisión corredora del 8%, y plazo de 24 meses.',
    text: `CONTRATO DE ARRENDAMIENTO RESIDENCIAL - COMUNA DE PROVIDENCIA

COMPARECEN:
Arrendador: MATÍAS IGNACIO LARRAÍN ERRAZURIZ, C.I. 14.102.833-8, Billetera Avalanche C-Chain: 0x90F79bf6EB2c4f870365E785982E1f101E93b906.
Arrendataria: VALENTINA PAZ CASTRO RIQUELME, C.I. 17.650.119-3, Billetera Avalanche C-Chain: 0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC.
Entidad Corredora: GESTIÓN INMOBILIARIA METROPOLITANA SPA, RUT 77.203.491-K, Billetera Avalanche C-Chain: 0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65.

CLÁUSULAS ESENCIALES:
1. Inmueble: Departamento 602, calle Pedro de Valdivia 1840, Providencia. Destino habitacional exclusivo.
2. Duración: 24 meses improrrogables salvo acuerdo por escrito.
3. Renta de Arrendamiento: El canon mensual asciende a 850 USDC (ochocientos cincuenta USDC en Avalanche).
4. Liquidación y Split Financiero:
   - Comisión de corretaje mensual: 8% (68 USDC mensuales) transferidos de forma directa a la billetera de la Corredora.
   - Pago neto mensual al propietario Arrendador: 92% (782 USDC mensuales).
   - Día de pago acordado: día 5 de cada mes.
5. Reajuste: Reajuste cada 6 meses tomando como base la variación de la UF (Unidad de Fomento).
6. Mes de Garantía: Se constituye un depósito de garantía por 850 USDC, custodiado en garantía líquida con devolución a 30 días tras entrega de llaves.
7. Multa por Desahucio o Salida Anticipada: Indemnización de 1,5 meses de renta si el arrendatario desiste con preaviso inferior a 30 días.
8. Cláusula de Restitución Rápida: Se autoriza la aplicación del procedimiento monitorio de la Ley 21.461 (Ley Devuélveme Mi Casa) en caso de mora superior a 10 días.`,
  },
  {
    id: 'chile-vina-comercial',
    title: 'Contrato Local Comercial Viña del Mar (Comisión 12% y 2 Meses Garantía)',
    category: 'Comercial / Oficinas',
    description: 'Contrato comercial de local en Viña del Mar con 2 meses de garantía, comisión del 12% para la corredora y canon de 2.500 USDC.',
    text: `CONTRATO DE ARRENDAMIENTO DE LOCAL COMERCIAL

Partes intervinientes:
- ARRENDADORA: INVERSIONES COSTA BRAVA LIMITADA, RUT 76.120.908-4. Representante: Sebastián Echeverría Lagos.
  Billetera Avalanche C-Chain: 0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199
- ARRENDATARIO: EMPORIO DEL MAR SPA, RUT 77.581.002-3. Representante: Rodrigo Morales Peñaloza.
  Billetera Avalanche C-Chain: 0xdD2FD4581271e230360230F9337D5c0430Bf44C0
- CORREDORA Y BROKER INMOBILIARIO: VALPARAÍSO COMERCIAL PROPERTIES S.A., RUT 96.882.331-5.
  Billetera Avalanche C-Chain: 0xbDA5747bFD65F08deb54cb465eB87D40e51B197E

CONDICIONES COMERCIALES Y FINANCIERAS:
- Propiedad: Local comercial N° 3, calle Valparaíso 650, Viña del Mar.
- Canon mensual: 2.500 USDC pagaderos en los primeros 5 días de cada mes.
- Comisión Corredora de Administración: 12% del canon mensual (300 USDC mensuales).
- Renta Líquida Arrendadora: 88% del canon mensual (2.200 USDC mensuales).
- Garantía de Cumplimiento: 2 meses de renta equivalentes a 5.000 USDC por tratarse de habilitación y giro comercial. Devolución sujeta a finiquito de servicios básicos y patentes municipales dentro de 45 días.
- Cláusula de Reajuste: Reajuste anual según variación del IPC más 2% de prima comercial.
- Penalización por término voluntario anticipado: Pago de 2 meses de renta en concepto de lucro cesante con aviso previo de 90 días.
- Cumplimiento de Normativa: Declaración de plena observancia de la Ley 18.101 y Código de Comercio.`,
  },
  {
    id: 'warning-draft-risk',
    title: 'Borrador con Cláusulas de Alerta / Desproporcionadas',
    category: 'Auditoría de Riesgo',
    description: 'Borrador que contiene cláusula penal excesiva de 4 meses de renta, sin plazo claro de restitución de garantía y sin mecanismo transparente de reajuste.',
    text: `BORRADOR DE ACUERDO DE ARRIENDO CON CONDICIONES ESPECIALES

Propietario: Fernando Castillo (Wallet Avalanche: 0x2546BcD3c84621e976D8185a91A922aE77ECEc30)
Inquilino: Esteban Duarte (Wallet Avalanche: 0xb5d288D1865da8401451F256d8091444a58571ab)
Agente Inmobiliario: RentaRápida Express (Wallet Avalanche: 0x14dC79964da2C08b23698B3D3cc7Ca32193d9955)

Términos del borrador:
- Renta mensual: 1.500 USDC con vencimiento el día 1 de cada mes.
- Comisión agente: 15% mensual (225 USDC), neto propietario 1.275 USDC.
- Garantía: El inquilino pagará 1.500 USDC de garantía. El propietario podrá retenerla indefinidamente si considera que hay detalles estéticos menores.
- Reajuste: El propietario podrá subir la renta unilateralmente cada 3 meses según su propio criterio de mercado.
- Multa de salida: Si el inquilino rescinde el contrato antes de 3 años, deberá pagar una multa irrevocable equivalente a 4 meses de renta total (6.000 USDC).
- Renuncia de acciones judiciales: El inquilino renuncia a demandar por vicios redhibitorios o filtraciones en la propiedad.`,
  },
];
