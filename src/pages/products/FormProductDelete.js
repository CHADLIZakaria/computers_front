import React from 'react'

const FormProductDelete = () => {
  return (
    <Form className='col-12'>
    <div className='row'>
        {/* Titre */}
        <div className='row align-items-center col-6'>
            <div className='col-3'>
                <label className='col-form-label'>Titre</label>
            </div>
            <div className='col-6'>
                <Field type="text" name="title"  className='form-control form-control-sm' />
            </div>
            <div className='col-3'>
                <ErrorMessage component="span" className='text-danger form-text' name='title'/>
            </div>
        </div>
        {/* Prix */}
        <div className='row align-items-center col-6'>
            <div className='col-3'>
                <label className='col-form-label'>Prix</label>
            </div>
            <div className='col-6'>
                <div class="input-group input-group">
                    <Field type="text" name="price"  className='form-control form-control-sm' />
                    <span class="input-group-text" id="inputGroup-sizing-sm">DH</span>
                </div>
            </div>
            <div className='col-3'>
                <ErrorMessage component="span" className='text-danger form-text' name='description'/>
            </div>
        </div>
    </div>
    <div className='row'>
            {/* Mark */}
        <div className='row align-items-center col-6'>
                <div className='col-3'>
                    <label className='col-form-label'>Mark</label>
                </div>
                <div className='col-6'>
                    <Field as='select' name='mark' className='form-select form-select-sm'>
                        <option label="Selectionnez la marque" />
                        <option value="HP" label="HP" />  
                    </Field>
                </div>
                <div className='col-3'>
                    <ErrorMessage component="span" className='text-danger form-text' name='mark'/>
                </div>
        </div>
        {/* Image */}
        <div className='row align-items-center col-6'>
            <div className='col-3'>
                <label className='col-form-label'>Image</label>
            </div>
            <div className='col-6'>
                <input type="file"  className='form-control form-control-sm' onChange={(e) => {
                    setFieldValue('file', e.currentTarget.files[0])
                }}/>
            </div>
        </div>
    </div>
    <div className='row'>
        {/* Model */}
        <div className='row align-items-center col-6'>
            <div className='col-3'>
                <label className='col-form-label'>Model</label>
            </div>
            <div className='col-6'>
                <Field type="text" name="model"  className='form-control form-control-sm' />
            </div>
            <div className='col-3'>
                <ErrorMessage component="span" className='text-danger form-text' name='model'/>
            </div>
        </div>
        {/* Ram */}
        <div className='row align-items-center col-6'>
            <div className='col-3'>
                <label className='col-form-label'>Ram</label>
            </div>
            <div className='col-6'>
                <Field as='select' name='ram' className='form-select form-select-sm'>
                    <option label="RAM" />
                    <option value="2Go" label="2Go" />  
                    <option value="4Go" label="4Go" />  
                    <option value="6Go" label="6Go" />  
                    <option value="8Go" label="8Go" />  
                    <option value="16Go" label="16Go" />
                    <option value="32Go" label="32Go" />  
                </Field>
            </div>
            <div className='col-3'>
                <ErrorMessage component="span" className='text-danger form-text' name='reference'/>
            </div>
        </div>
    </div>
    <div className='row'>
        {/* Reference */}
        <div className='row align-items-center col-6'>
            <div className='col-3'>
                <label className='col-form-label'>Réference</label>
            </div>
            <div className='col-6'>
                <Field type="text" name="reference"  className='form-control form-control-sm' />
            </div>
            <div className='col-3'>
                <ErrorMessage component="span" className='text-danger form-text' name='reference'/>
            </div>
        </div>
        {/* Stockage HDD */}
        <div className='row align-items-center col-6'>
            <div className='col-3'>
                <label className='col-form-label'>Stockage HDD</label>
            </div>
            <div className='col-6'>
                <Field as='select' name='hdd' className='form-select form-select-sm'>
                    <option label="Stockage HDD" />
                    <option value="128 Go" label="128Go" />  
                    <option value="512 Go" label="512Go" />  
                    <option value="1 To" label="1To" />  
                    <option value="2 To" label="2To" />   
                </Field>
            </div>
            <div className='col-3'>
                <ErrorMessage component="span" className='text-danger form-text' name='stockage'/>
            </div>
        </div>
    </div>
    <div className='row'>
        {/* Processeur */}
        <div className='row align-items-center col-6'>
            <div className='col-3'>
                <label className='col-form-label'>Processeur</label>
            </div>
            <div className='col-6'>
                <Field type="text" name="processeur"  className='form-control form-control-sm' />
            </div>
            <div className='col-3'>
                <ErrorMessage component="span" className='text-danger form-text' name='processeur'/>
            </div>
        </div>
        {/* Qauntite */}
        <div className='row align-items-center col-6'>
            <div className='col-3'>
                <label className='col-form-label'>Quantité</label>
            </div>
            <div className='col-6'>
                <div class="input-group input-group-sm">
                    <span class="input-group-text cursor-pointer" onClick={() => {if(values.quantite > 1) setFieldValue('quantite', values.quantite-1)}}>-</span>
                    <Field type="text" class="form-control form-control-sm" name="quantite" />
                    <span class="input-group-text cursor-pointer"  onClick={() => {setFieldValue('quantite', values.quantite+1)}}>+</span>
                </div>
            </div>
            <div className='col-3'>
                <ErrorMessage component="span" className='text-danger form-text' name='quantite'/>
            </div>
        </div>
    </div>
    <div className='row'>
        {/* Ecran */}
        <div className='row align-items-center col-6'>
            <div className='col-3'>
                <label className='col-form-label'>Ecran</label>
            </div>
            <div className='col-6'>
                <Field type="text" name="ecran"  className='form-control form-control-sm' />
            </div>
            <div className='col-3'>
                <ErrorMessage component="span" className='text-danger form-text' name='ecran'/>
            </div>
        </div>
            {/* Stockage SDD */}
            <div className='row align-items-center col-6'>
            <div className='col-3'>
                <label className='col-form-label'>Stockage SDD</label>
            </div>
            <div className='col-6'>
                <Field as='select' name='ssd' className='form-select form-select-sm'>
                    <option label="Stockage SDD" />
                    <option value="128 Go" label="128Go" />  
                    <option value="512 Go" label="512Go" />  
                    <option value="1 To" label="1To" />  
                    <option value="2 To" label="2To" />   
                </Field>
            </div>
            <div className='col-3'>
                <ErrorMessage component="span" className='text-danger form-text' name='sdd'/>
            </div>
        </div>
    </div>
    <div className='row'>
        {/* Fréquence */}
        <div className='row align-items-center col-6'>
            <div className='col-3'>
                <label className='col-form-label'>Fréquence</label>
            </div>
            <div className='col-6'>
                <Field type="text" name="frequence"  className='form-control form-control-sm' />
            </div>
            <div className='col-3'>
                <ErrorMessage component="span" className='text-danger form-text' name='frequence'/>
            </div>
        </div>
        {/* Autonomie */}
        <div className='row align-items-center col-6'>
            <div className='col-3'>
                <label className='col-form-label'>Autonomie</label>
            </div>
            <div className='col-6'>
                <Field type="text" name="autonomie"  className='form-control form-control-sm' />
            </div>
            <div className='col-3'>
                <ErrorMessage component="span" className='text-danger form-text' name='autonomie'/>
            </div>
        </div>      
    </div>
    <div className='row'>
            {/* Système d'exploitation */}
            <div className='row align-items-center col-6'>
            <div className='col-5'>
                <label className='col-form-label'>Système d’exploitation</label>
            </div>
            <div className='col-4'>
                <Field type="text" name="systeme_exploitation"  className='form-control form-control-sm' />
            </div>
            <div className='col-3'>
                <ErrorMessage component="span" className='text-danger form-text' name='systeme_exploitation'/>
            </div>
        </div>
    </div>
    <button className="btn btn-primary" type="submit">Enregistrer</button>
</Form>
  )
}

export default FormProductDelete