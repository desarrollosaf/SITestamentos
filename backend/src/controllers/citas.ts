import { Request, Response } from 'express';
import sequelizefun from '../database/fun'; // La conexión
import { dp_fum_datos_generales } from '../models/fun/dp_fum_datos_generales';
import { dp_datospersonales } from '../models/fun/dp_datospersonales';
import Cita from '../models/citas';
 import { Op } from 'sequelize';
import { Sequelize, Model, DataTypes } from 'sequelize';
import UsersSafs from '../models/saf/users';
import SUsuario from '../models/saf/s_usuario';
import Dependencia from '../models/saf/t_dependencia';
import Direccion from '../models/saf/t_direccion';
import Departamento from '../models/saf/t_departamento';
import { sendEmail } from '../utils/mailer';

dp_datospersonales.initModel(sequelizefun);
dp_fum_datos_generales.initModel(sequelizefun);

export const getservidor = async (req: Request, res: Response): Promise<any> => {
    const { id } = req.params;
  try {
   
    let registro: dp_datospersonales | dp_fum_datos_generales | null = await dp_datospersonales.findOne({ 
    where: { f_curp: id }
    });

    if (!registro) {
    registro = await dp_fum_datos_generales.findOne({ 
        where: { f_curp: id }
    });

    if (!registro) {
        return res.status(500).json({ error: 'existe un servidor publico en el curp', id });
    }
    }
    return res.json({
      msg: `si existe el servidor`,
      estatus: '200'
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Ocurrió un error al obtener los registros' });
  }
};

const MAX_CITAS = 20;

export const validafecha = async (req: Request, res: Response): Promise<any> => {
  const { id } = req.params;

  try {
    const totalCitas = await Cita.count({ 
      where: { fecha: id }
    });

    const disponibles = MAX_CITAS - totalCitas;

    if (totalCitas >= MAX_CITAS) {
      return res.status(400).json({ 
        error: 'Ya no se pueden agendar más citas para esta fecha. Límite alcanzado (20).' 
      });
    }
    
    return res.json({
      msg: `Sí tenemos disponibilidad`,
      disponibles,
      estatus: '200'
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Ocurrió un error al obtener los registros' });
  }
};

export const saveregistro = async (req: Request, res: Response): Promise<any> => {
    const  data  = req.body;
  try {
     const citasser = await Cita.findAll({
        where: {
          rfc: data.rfc,
          estatus: 0
        }
      });
     
      if(citasser.length > 0){
        return res.status(400).json({ error: 'cuentas con una solicitud', estatus: 400  });
      }

     const cita = await Cita.create({
       rfc: data.rfc,
       fecha: data.fecha,
       hora: data.hora,
       estatus: 0,
     }); 
     return res.json({
      msg: `cita guardada`,
      estatus: 200
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'No  se guardo' });
  }
};

export const getCita = async (req: Request, res: Response): Promise<any> => {
    const { id } = req.params;
  try {
   
    const citasser = await Cita.findAll({
      where: { rfc: id }
    })

   const usuario = await dp_datospersonales.findAll({
      where: { f_rfc: id },
        attributes: [
          'correo_ins',
          'correo_per',
          'numero_tel',
          'numero_cel',
          [Sequelize.literal(`CONCAT(f_nombre, ' ', f_primer_apellido, ' ', f_segundo_apellido)`), 'nombre_completo']
        ],
      raw: true
    });

    return res.json({
      msg: `si existe el servidor`,
      citas: citasser,
      dtaosuser: usuario
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Ocurrió un error al obtener los registros' });
  }
};

export const getcitas = async (req: Request, res: Response): Promise<any> => {
  try {
   
    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);


    const formatDate = (date: Date) => date.toISOString().split('T')[0];

    const citas = await Cita.findAll({
      where: {
        fecha: {
          [Op.in]: [formatDate(today), formatDate(tomorrow)]
        }
      },
      order: [['fecha', 'ASC']]
    });

     for (const cita of citas) {
            if (cita.rfc) {
                console.log('Buscando datos personales para:', cita.rfc);

                const datos = await dp_datospersonales.findOne({
                 where: { f_rfc: cita.rfc },
                    attributes: [
                      'correo_ins',
                      'correo_per',
                      'numero_tel',
                      'numero_cel',
                      [Sequelize.literal(`CONCAT(f_nombre, ' ', f_primer_apellido, ' ', f_segundo_apellido)`), 'nombre_completo']
                    ],
                  raw: true
                });

                if (datos) {
                cita.setDataValue('datos_user', datos);
                }
            }
      }

      for (const cita of citas) {
            if (cita.rfc) {
                console.log('Buscando datos personales para:', cita.rfc);

                const datos = await SUsuario.findOne({
                 where: { N_Usuario: cita.rfc },
                    attributes: [
                      'N_Usuario', 
                    ], 
                    include: [
                        {
                        model: Dependencia,
                        as: 'dependencia',
                        attributes: [
                          'nombre_completo', 
                        ], 
                        },
                        {
                        model: Direccion,
                        as: 'direccion',
                        attributes: [
                          'nombre_completo', 
                        ], 
                        },
                        {
                        model: Departamento,
                        as: 'departamento',
                        attributes: [
                          'nombre_completo', 
                        ], 
                        },
                    ],
                });

                if (datos) {
                cita.setDataValue('dependencia', datos);
                }
            }
      }



    return res.json({
      msg: `si existe el servidor`,
      citas: citas,
    
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Ocurrió un error al obtener los registros' });
  }
};

export const atenderconliga = async (req: Request, res: Response): Promise<any> => {
    const  data  = req.body;
  try {

    const usuario = await dp_datospersonales.findOne({
      where: { f_rfc: data.rfc },
        attributes: [
          'correo_ins',
          'correo_per',
          'f_nombre',
          'f_primer_apellido',
          'f_segundo_apellido',
        ],
      raw: true
    });
   
    let correo = usuario ? (usuario.correo_ins || usuario.correo_per) : null;

    if (!usuario) {
      return res.status(400).json({ error: 'No se encontró el usuario' });
    }
    

    if (!correo) {
      return res.status(400).json({ error: 'Sin correos' });
    }

    (async () => {
      try {
          const meses = [
            "enero", "febrero", "marzo", "abril", "mayo", "junio",
            "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"
            ];
          const hoy = new Date();
          const fechaFormateada = `Toluca de Lerdo, México; a ${hoy.getDate()} de ${meses[hoy.getMonth()]} de ${hoy.getFullYear()}.`;
          const contenido = `
           <div class="container">
            <p  class="pderecha" >${fechaFormateada}</p>
            <p>C. ${usuario.f_nombre} ${usuario.f_primer_apellido} ${usuario.f_segundo_apellido},</p>
            <p>${data.texto}</p>
            <p>
              Liga: ${data.enlace}
            </p>
            <p>Atentamente,<br><strong>Poder Legislativo del Estado de México</strong></p>
          </div>
        `;
        let htmlContent = generarHtmlCorreo(contenido);
        await sendEmail(
          correo,
          'Correo de notificacion',
           htmlContent
        );

        console.log('Correo enviado correctamente');
      } catch (err) {
        console.error('Error al enviar correo:', err);
      }
    })();

    const citasser = await Cita.findOne
    ({
      where: { id: data.citaid }
    })
    if (!citasser) {
      return res.status(404).json({ msg: 'Cita no encontrado' });
    }
    await citasser.update({
      estatus: 1
    });

    return res.json({
      msg: `Guardado corectamente`,
      estatus: 200,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Ocurrió un error al obtener los registros' });
  }
};

function generarHtmlCorreo(contenidoHtml: string): string {
  return `
    <html>
      <head>
        <style>
             body {
              font-family: Arial, sans-serif;
              background-color: #f4f4f7;
              margin: 0;
              padding: 0;
            }
            .container {
              background-color: #ffffff;
              max-width: 600px;
              margin: 40px auto;
              border-radius: 10px;
              box-shadow: 0 0 10px rgba(0,0,0,0.1);
              padding: 30px;
            }
            h1 {
              color: #2c3e50;
              font-size: 22px;
              margin-bottom: 20px;
            }
            p {
              color: #4d4d4d;
              font-size: 16px;
              line-height: 1.5;
            }
            .credentials {
              background-color: #ecf0f1;
              padding: 15px;
              border-radius: 8px;
              margin: 20px 0;
              font-family: monospace;
            }
            .button {
              display: inline-block;
              background-color: #007bff;
              color: white;
              padding: 12px 20px;
              text-decoration: none;
              border-radius: 6px;
              font-size: 16px;
              margin-top: 20px;
            }
            .footer {
              font-size: 12px;
              color: #999999;
              margin-top: 30px;
              text-align: center;
            }
               .pderecha{
            text-align: right;
            }
        </style>
      </head>
      <body>
        <div style="text-align: center;">
          <img 
            src="https://congresoedomex.gob.mx/storage/images/congreso.png" 
            alt="Logo"
            style="display: block; margin: 0 auto; width: 300px; height: auto;"
          >
        </div>
        <div class="content">
          ${contenidoHtml}
        </div>
        <div class="footer">
          © ${new Date().getFullYear()} SITestamento. Todos los derechos reservados.
        </div>
      </body>
    </html>
  `;
}

export const atendercita= async (req: Request, res: Response): Promise<any> => {
    const { id } = req.params;
    console.log(id)
  try {
    const citasser = await Cita.findOne
    ({
      where: { id: id}
    })
    if (!citasser) {
      return res.status(404).json({ msg: 'Cita no encontrado' });
    }
    await citasser.update({
      estatus: 1
    });

    return res.json({
      msg: `Guardado corectamente`,
      estatus: 200,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Ocurrió un error al obtener los registros' });
  }
};


