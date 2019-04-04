import data from './data';
import ReasonScoreMath from './ReasonScoreMath';

class ViewModelBuilder {
    constructor(setState, topClaimId) {
        this.setState = setState;
        this.topClaimId = topClaimId;
        this.data = new data(topClaimId, this.updateState.bind(this));
        this.state = {
            vm: this.buildViewModel(this.topClaimId, this.topClaimId, []),
            data: this.data
        };
    }

    updateState() {
        this.setState({
            vm: this.buildViewModel(this.topClaimId, this.topClaimId, [])
        });
    }

    onSelect(vm) {
        this.selectedVm = vm;
        this.setState({
            vm: this.buildViewModel(this.topClaimId, this.topClaimId, [])
        });
    }

    newChild(vm, pro) {
        var newClaim = {
            type: "claim",
            id: this.data.newId(),
            content: "",
        };
        var newArgument = {
            type: "argument",
            id: this.data.newId(),
            parent: vm.claim.id,
            child: newClaim.id,
            scope: vm.claim.id,
            pro: pro,
            affects: "truth"
        };
        this.data.sendTransaction([
            {
                id: newClaim.id,
                act: 'add',
                new: newClaim,
            }, {
                id: newArgument.id,
                act: 'add',
                new: newArgument,
            }
        ]);
    }

    buildViewModel(topId, parentClaimId, ancestors, conTop) {
        const childArguments = this.data.getArguments(parentClaimId, ancestors);
        const childVms = [];
        const childScores = [];
        const childIds = [];

        childArguments.forEach((argument) => {
            const childAncestors = ancestors.slice();
            childAncestors.push(parentClaimId);
            const childVm = this.buildViewModel(topId, argument.child, childAncestors,
                argument.pro ? conTop : !conTop);
            childVm.argument = argument;
            childVms.push(childVm);
        });

        const vm = {
            id: '',
            topId,
            childId: parentClaimId,
            children: [],
        };

        vm.id = ancestors.join('/');
        if (vm.id.length > 0) {
            vm.id += '/';
        }
        vm.id += parentClaimId;


        childVms.forEach((childVm) => {
            childScores.push(childVm.score);
            if (!childVm.score.id) {
                childVm.score.id = this.data.newId();
            }
            childIds.push({
                scoreId: childVm.score.id,
                claimId: childVm.claimId
            });
        });

        //add everything in
        vm.score = ReasonScoreMath.calculateReasonScore(parentClaimId, childArguments, childScores);
        vm.children = childVms;
        vm.childIds = childIds
        vm.conTop = conTop;
        vm.className = 'claim' + (vm.conTop ? ' con' : ' pro');
        vm.claim = this.data.getClaim(parentClaimId);
        vm.content = vm.claim.content;
        //vm.display = vm.score.display;
        if (this.selectedVm && vm.id === this.selectedVm.id) {
            vm.selected = true
            vm.unSelect = () => this.onSelect();
        } else {
            vm.onSelect = () => this.onSelect(vm);
        }
        vm.increase = () => this.newChild(vm, true);
        vm.decrease = () => this.newChild(vm, false);
        vm.sendTransaction = this.data.sendTransaction.bind(this.data);
        return vm;
    }
}
export default ViewModelBuilder;