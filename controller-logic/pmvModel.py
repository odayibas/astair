import math
import sys
from datetime import datetime

"""
    --- Input Parameters ---
    Air Temperature (Celsius) -> ta
    Mean Radiant Temperature (Celsius) -> tr
    Relative Air Velocity (m/s) -> vel
    Relative Humidity (%) -> rh
    Metabolic Rate (met) -> met (1.2)
    Clothing (clo) -> clo (0.3)
    External Work (Generally 0) -> work
"""

# This function calls all necessary functions.
def pmv(ta, tr, vel, rh, met, clo, work = 0):
    pa = calculatePA(rh, ta)
    icl = calculateICL(clo)
    mw = calculateMW(met, work)
    fcl = calculateFCL(icl)
    hcf = calculateHCF(vel)
    taa = convertKelvin(ta)
    tra = convertKelvin(tr)
    tcla = calculateTCLA(taa, ta, icl)
    tcl, xn, hc = calculateTCL(icl, fcl, taa, tra, mw, tcla, hcf)
    totalLost = calculationTotalLost(mw, pa, met, ta, fcl, xn, tra, tcl, hc)
    ts = calculationTS(met)
    pmv = calculatePVM(ts, mw, totalLost)
    ppd = calculatePPD(pmv)
    return pmv, ppd

# This function displays pmv and ppd in screen.
def display(pmv, ppd, cel):
    print(f"PMV Value: {pmv}")
    print(f"PPD Value: {ppd}")
    degree = round(pmv, 0)
    print(f'New A/C Degree: {cel + degree}')

# This function calculates pressure.
# Unit -> Pa
def calculatePA(rh, ta):
    return rh * 10.0 * math.exp(16.6536 - 4030.183 / (ta + 235.0))

# This function calculates thermal insulation of the clothing.
# Unit -> m^2 * K/W
def calculateICL(clo):
    return 0.155 * clo

# This function calculates internal heat production in the human body,
# Using metabolic rate and external work.
# met&work unit -> met
# Unit -> W/m^2
def calculateMW(met, work):
    m = met * 58.15 # Convert W/m^2
    w = work * 58.15 # Convert W/m^2
    return m + w

# This function calculates clothing area factor
def calculateFCL(icl):
    if(icl < 0.078):
        fcl = 1.0 + 1.29 * icl
    else:
        fcl = 1.05 + 0.645 * icl
    return fcl

# This function calculates heat transfer coefficient by forced convection.
# Unit -> W/(m^2*K)
def calculateHCF(vel):
    return 12.1 * (vel**0.5)

# This function converts celsius to kelvin,
# for air temp. and mean radiant temp.
def convertKelvin(temp):
    return temp + 273

# -----
# This functions calculate clothing surface temperature.
# Unit -> Celsius (C)
def calculateTCLA(taa, ta, icl):
    return taa + (35.5 - ta) / (3.5 * icl + 0.1)

def calculateTCL(icl, fcl, taa, tra, mw, tcla, hcf):
    p1 = icl * fcl
    p2 = p1 * 3.96
    p3 = p1 * 100.0
    p4 = p1 * taa
    p5 = 308.7 - 0.028 * mw + p2 * (tra/100) ** 4
    xn = tcla / 100.0
    xf = xn / 50.0
    n = 0
    eps = 0.00015
    hc = 1.0

    while(abs(xn-xf) > eps):
        xf = (xf + xn) / 2.0
        hcn = 2.38 * abs(100.0 * xf - taa)**0.25
        if(hcf > hcn):
            hc = hcf
        else:
            hc = hcn
        
        xn = (p5 + p4 * hc - p2 * xf**4.0) / (100.0 + p3 * hc)
        n = n + 1
        if(n>150):
            print("Error")
            exit()
    tcl = 100.0 * xn - 273.0
    return tcl, xn, hc
# -----

# This function calculates total lost.
def calculationTotalLost(mw, pa, m, ta, fcl, xn, tra, tcl, hc):
    m = m * 58.15 # Convert met to W/m^2
    hl1 = 3.05 * 0.001 * (5733.0 - 6.99 * mw - pa) # heat loss diff. through skin
    if(mw > 58.15): # heat loss by sweating
        hl2 = 0.42 * (mw - 58.15) 
    else:
        hl2 = 0.0
    hl3 = 1.7 * 0.00001 * m * (5867.0 - pa) # latent respiration heat loss
    hl4 = 0.0014 * m * (34.0 - ta) # dry respiration heat loss
    hl5 = 3.96 * fcl * (xn**4.0 - (tra/100.0)**4.0) # heat loss by radiation
    hl6 = fcl * hc * (tcl - ta)
    return hl1 + hl2 + hl3 + hl4 + hl5 + hl6 # Sum of loss

# This function calculates thermal sensation transfer coeefficient.
def calculationTS(m):
    return 0.303 * math.exp(-0.036 * (m * 58.15)) + 0.028

# This function calculates predicted percentage dissat (PPD).
def calculatePPD(pmv):
    return 100 - 95 * math.exp(-0.03353 * (pmv**4) - 0.2179 * (pmv**2))

# This function calculates predicted mean vote (PVM).
def calculatePVM(ts, mw, totalLost):
    return ts * (mw - totalLost)

def writeFile(pmv, ppd, tr):
    myFile = open('PMVModel.txt', 'a')
    myFile.write('\nAccessed on ' + str(datetime.now()) + " PMV: " + str(pmv) + " PPD: " + str(ppd) + " New A/C Degree: " + str(round(pmv, 0) + tr))

# Main Function    
if __name__ == "__main__":
    if(len(sys.argv) != 7):
        print("Error")
        sys.exit(1)
    tr = float(sys.argv[1]) #25
    ta = float(sys.argv[2]) #23.5
    vel = float(sys.argv[3]) #0.2
    rh = float(sys.argv[4]) #60
    met = float(sys.argv[5]) #1.2
    clo = float(sys.argv[6]) #0.3
    pmv, ppd = pmv(tr, ta, vel, rh, met, clo)
    #writeFile(pmv, ppd, tr)