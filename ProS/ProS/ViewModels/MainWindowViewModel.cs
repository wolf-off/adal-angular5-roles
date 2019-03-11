using Prism.Commands;
using Prism.Mvvm;
using Prism.Regions;
using ProS.Model;
using ProS.Wpf.Views;
using ProS.Wpf.Views;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProS.Wpf.ViewModels
{
    class MainWindowViewModel : BaseViewModel
    {
        private string _state = "Loading";
        public string State
        {
            get
            {
                return _state;
            }
            set
            {
                SetProperty(ref _state, value);
            }
        }

        private IRegionManager _regionManager;
        public MainWindowViewModel(IRegionManager regionManager)
        {
            _regionManager = regionManager;
            regionManager.RegisterViewWithRegion("MainRegion", typeof(Zones));
            regionManager.RegisterViewWithRegion("MainRegion", typeof(Total));
            ToZones = new DelegateCommand(() =>
            {
                _regionManager.RequestNavigate("MainRegion", "Zones");
            });
            ToTotal = new DelegateCommand(() =>
            {
                _regionManager.RequestNavigate("MainRegion", "Total");
            });
        }
        public DelegateCommand ToZones { get; set; }
        public DelegateCommand ToTotal { get; set; }
    }
}
