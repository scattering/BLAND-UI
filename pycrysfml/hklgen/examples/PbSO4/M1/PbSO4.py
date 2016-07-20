import os,sys;sys.path.append(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))
import numpy as np
import fswig_hklgen as H
import hkl_model as Mod
np.seterr(divide="ignore", invalid="ignore")    

DATAPATH = os.path.dirname(os.path.abspath(__file__))
backgFile = os.path.join(DATAPATH,"pbso4.bac")
observedFile = os.path.join(DATAPATH,"pbso4.dat")
infoFile = os.path.join(DATAPATH,"pbso4.pcr")

(spaceGroup, crystalCell, atoms) = H.readInfo(infoFile)
wavelength = 1.912000
backg = H.LinSpline(None)
ttMin = 10
ttMax = 155.449996948
ttStep = 0.0499828168207
exclusions = None #[[0,10],[154,180]]
tt, observed, error = H.readIllData(observedFile, "D1A", backgFile)

class Opts:
    def __init__(self, fit, store, args):
        self._fit = fit
        self._store = store
        self._args = args
    @property
    def fit(self):
        return self._fit
    @property
    def store(self):
        return self._store
    @property
    def args(self):
        return self._args
    @property
    def overwrite(self):
        return None
    @property
    def batch(self):
        return None

def fit():
    # PYTHONPATH=. bumps Al2O3.py --fit=dream --store=M1 --burn=100 --steps=500
    cell = Mod.makeCell(crystalCell, spaceGroup.xtalSystem)
    cell.a.pm(5.0)
    cell.b.pm(5.0)
    cell.c.pm(5.0)
    print(backg)
    m = Mod.Model(tt, observed, backg, 0, 0, 1, wavelength, spaceGroup, cell,
                atoms, exclusions, base=min(observed), zero=-0.09459, error=error, eta=0)
    m.u.range(0,1)
    m.zero.pm(0.5)
    m.v.range(-1,0)
    m.w.range(0,1)
    m.eta.range(0,1)
    m.scale.range(0,100)
    m.base.pm(500)
    for atomModel in m.atomListModel.atomModels:
        #atomModel.x.pm(0.1)
        #atomModel.z.pm(0.1)
        atomModel.x.range(0,1)
        atomModel.z.range(0,1)
        if (atomModel.atom.multip == atomModel.sgmultip):
            # atom lies on a general position
            #atomModel.x.pm(0.1)
            #atomModel.y.pm(0.1)
            #atomModel.z.pm(0.1)
            atomModel.y.range(0,1)
    #m.atomListModel["Al1"].z.pm(0.1)
    #m.atomListModel["O1"].x.pm(0.1)
    #m.atomListModel["O3"].y.pm(0.1)
    m.atomListModel["Pb"].B.range(0,10)
    try:
        M = FitProblem(m)
    except:
        M = bumps.FitProblem(m)
    
   # opts = BumpsOpts(['/home/nathan-super/.local/bin/bumps', '/mnt/hgfs/Ubuntu_Shared/pycrysfml/hklgen/examples/PbSO4/PbSO4.py', '--fit=dream', '--store=/tmp/bland/M1', 'burn=100', 'steps=500'])
    """opts = Opts(DreamFit, '/tmp/bland/M1', ['burn=0', 'steps=5'])
    #opts['fit'] = DreamFit
    print(opts)
    #opts[store] = '/tmp/bland/M1'
    #opts.args = ['burn=100', 'steps=500']
    #opts.fit_config.set_from_cli(opts)
    #print(opts.store)
    setup_logging()
    problem = M
    problem.path = '/mnt/hgfs/Ubuntu_Shared/pycrysfml/hklgen/examples/PbSO4/PbSO4.py'
    mapper = SerialMapper
    extra_opts = {'burn': 0, 'init': 'eps', 'steps': 5, 'samples': 10000}
    
    fitdriver = FitDriver(
            DreamFit, problem=problem, abort_test=lambda: False,
            **extra_opts)    
    
    make_store(problem, opts, exists_handler=store_overwrite_query)
    resume_path = None
    fitdriver.mapper = mapper.start_mapper(problem, opts.args)
    best, fbest = fitdriver.fit(resume=resume_path)
    save_best(fitdriver, problem, best)
    mapper.stop_mapper(fitdriver.mapper)
    beep()
    import pylab
    pylab.show()"""
    M.model_update()
    return M

def main():
    cell = H.CrystalCell([8.478356,5.396669,6.957969],[90,90,90])
    uvw = [0.167065, -0.473453, 0.426145]
    H.diffPattern(infoFile=infoFile, wavelength=wavelength,
                  cell=cell, uvw=uvw, scale=1.4869,
                  ttMin=ttMin, ttMax=ttMax, info=True, plot=True,
                  observedData=(tt,observed), error=error, residuals = True)

if __name__ == "__main__":
    # program run normally
    from bumps.fitters import FitDriver, DreamFit
    from bumps.mapper import SerialMapper
    from bumps.fitproblem import FitProblem
    from bumps.options import BumpsOpts
    from bumps.cli import setup_logging, make_store, store_overwrite_query, save_best, beep
    #main()
    fit()
else:
    # called using bumps
    import bumps.names as bumps
    problem = fit()
