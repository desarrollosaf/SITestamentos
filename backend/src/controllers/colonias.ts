import { Request, Response } from 'express';
import { dp_estados } from '../models/fun/dp_estados';
import sequelizefun from '../database/fun'; // La conexión
import { dp_municipios } from '../models/fun/dp_municipios';
import { dp_colonias } from '../models/fun/dp_colonias';

// Llama a initModel
dp_estados.initModel(sequelizefun);
dp_municipios.initModel(sequelizefun);
dp_colonias.initModel(sequelizefun);

export const getRegistros = async (req: Request, res: Response): Promise<any> => {
    const { id } = req.params;
  try {
    const colonias = await dp_colonias.findAll({
            attributes: [
                ['id', 'idcol'],
                ['nombre', 'colon'],
            ],
            where: {
                codigo_postal: id,
            },
            include: [
                {
                model: dp_municipios,
                as: 'municipio_dp_municipio',
                required: false, 
                attributes: [
                    ['id', 'municipioid'],
                    ['nombre', 'municipionom'],
                ],
                    include: [  
                        {
                        model: dp_estados,
                        as: 'estado_dp_estado',
                        required: false, 
                        attributes: [
                            ['id', 'estadoid'],
                            ['nombre', 'estadonom'],
                        ],
                        },
                    ],
                },
            ],
        });
    return res.json({
      msg: `Lista obtenida exitosamente`,
      data: colonias
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Ocurrió un error al obtener los registros' });
  }
};
